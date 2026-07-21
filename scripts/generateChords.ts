import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { KEYS, CHORD_QUALITIES, noteLabel, chordName } from "../src/lib/chordTheory";
import { findVoicing, type Voicing } from "../src/lib/fretboardSolver";

interface ChordEntry {
  key: string; // key slug
  keyLabel: string;
  quality: string; // quality slug
  qualityLabel: string;
  name: string; // e.g. "Cmaj7"
  voicing: Voicing | null;
}

const entries: ChordEntry[] = [];

for (const key of KEYS) {
  for (const quality of CHORD_QUALITIES) {
    const voicing = findVoicing(key.pc, quality);
    entries.push({
      key: key.slug,
      keyLabel: key.label,
      quality: quality.slug,
      qualityLabel: quality.label,
      name: chordName(key.label.split("/")[0], quality),
      voicing,
    });
  }
}

const missing = entries.filter((e) => !e.voicing);
if (missing.length) {
  console.warn(`Warning: ${missing.length} chords had no findable voicing:`);
  missing.forEach((m) => console.warn(`  ${m.name} (${m.key}/${m.quality})`));
}

const outDir = join(__dirname, "..", "src", "data");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "chords.json"), JSON.stringify(entries, null, 2));

console.log(`Generated ${entries.length} chord voicings -> src/data/chords.json`);
