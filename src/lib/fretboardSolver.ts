import { OPEN_STRING_PITCH_CLASSES, type ChordQuality } from "./chordTheory";

export interface Voicing {
  // 6 entries, low E to high e. null = muted string, number = fret (0 = open).
  frets: (number | null)[];
  // Suggested left-hand finger per string (1=index..4=pinky), 0/null = open or muted.
  fingers: (number | null)[];
  baseFret: number; // fret number shown at top of the diagram (1 if it's an open-position shape)
}

const MAX_FRET_SPAN = 4;
const MAX_STARTING_FRET = 10;

function pitchClassesFromIntervals(root: number, intervals: number[]): Set<number> {
  return new Set(intervals.map((i) => ((root + i) % 12 + 12) % 12));
}

/**
 * Finds a playable voicing for the given root + quality by brute-force
 * searching fret positions on each string, constrained to a 4-fret
 * hand span. Prefers the lowest position on the neck, the most strings
 * sounded, and the root in the bass.
 */
export function findVoicing(root: number, quality: ChordQuality): Voicing | null {
  const mustPCs = pitchClassesFromIntervals(root, quality.mustIntervals);
  const allAllowedPCs = pitchClassesFromIntervals(root, [
    ...quality.mustIntervals,
    ...quality.optionalIntervals,
  ]);

  let best: { score: number; frets: (number | null)[] } | null = null;

  for (let base = 0; base <= MAX_STARTING_FRET; base++) {
    // Options per string: mute, open (only meaningful when base is 0..3 so it's in reach), or a fretted note within the span.
    const options: (number | null)[][] = OPEN_STRING_PITCH_CLASSES.map(() => []);
    for (let s = 0; s < 6; s++) {
      const opts: (number | null)[] = [null]; // muted always allowed
      if (base === 0) opts.push(0); // open string only offered at the nut position
      for (let f = Math.max(base, 1); f <= base + MAX_FRET_SPAN; f++) {
        opts.push(f);
      }
      options[s] = opts;
    }

    // Recursive search across the 6 strings.
    const stack: (number | null)[] = [];
    const search = (stringIdx: number) => {
      if (stringIdx === 6) {
        const played = stack
          .map((f, i) => (f === null ? null : { fret: f, pc: (OPEN_STRING_PITCH_CLASSES[i] + f) % 12 }))
          .filter((x): x is { fret: number; pc: number } => x !== null);

        if (played.length < Math.min(3, mustPCs.size)) return;

        const playedPCs = new Set(played.map((p) => p.pc));
        for (const pc of mustPCs) if (!playedPCs.has(pc)) return;
        for (const p of played) if (!allAllowedPCs.has(p.pc)) return;

        // Bass string (lowest sounded string) should ideally be the root.
        const firstSounded = stack.findIndex((f) => f !== null);
        const bassIsRoot =
          firstSounded !== -1 && (OPEN_STRING_PITCH_CLASSES[firstSounded] + (stack[firstSounded] as number)) % 12 === root;

        const frettedFrets = played.filter((p) => p.fret > 0).map((p) => p.fret);
        const span = frettedFrets.length ? Math.max(...frettedFrets) - Math.min(...frettedFrets) : 0;
        const openStringCount = played.filter((p) => p.fret === 0).length;
        // Use the actual lowest fretted position reached, not the search
        // window's start, so the same physical shape scores identically
        // no matter which window found it (and open shapes aren't
        // penalized by a barre shape's window overlapping theirs).
        const lowestFret = frettedFrets.length ? Math.min(...frettedFrets) : 0;

        // Score: prefer root in bass and open strings (idiomatic,
        // beginner-friendly shapes) over simply maximizing string count,
        // and prefer the lowest, tightest hand position.
        let score = played.length * 6;
        if (bassIsRoot) score += 25;
        score += openStringCount * 4;
        score -= lowestFret * 2;
        score -= span * 2;

        if (!best || score > best.score) {
          best = { score, frets: [...stack] };
        }
        return;
      }
      for (const opt of options[stringIdx]) {
        stack.push(opt);
        search(stringIdx + 1);
        stack.pop();
      }
    };
    search(0);
  }

  if (!best) return null;
  const { frets } = best as { score: number; frets: (number | null)[] };

  const frettedValues = frets.filter((f): f is number => f !== null && f > 0);
  const minFretted = frettedValues.length ? Math.min(...frettedValues) : 0;
  const baseFret = minFretted > 4 ? minFretted : 1;

  // Assign fingers low-to-high fret order (simple heuristic, not a full ergonomic solver).
  const frettedStrings = frets
    .map((f, i) => ({ f, i }))
    .filter((x) => x.f !== null && x.f > 0) as { f: number; i: number }[];
  const uniqueFrets = Array.from(new Set(frettedStrings.map((x) => x.f))).sort((a, b) => a - b);
  const fingerForFret = new Map<number, number>();
  uniqueFrets.forEach((f, idx) => fingerForFret.set(f, Math.min(idx + 1, 4)));

  const fingers: (number | null)[] = frets.map((f) => (f && f > 0 ? fingerForFret.get(f) ?? null : null));

  return { frets, fingers, baseFret };
}
