import chordsJson from "@/data/chords.json";
import type { Voicing } from "./fretboardSolver";

export interface ChordEntry {
  key: string;
  keyLabel: string;
  quality: string;
  qualityLabel: string;
  name: string;
  voicing: Voicing | null;
}

export const CHORDS: ChordEntry[] = chordsJson as ChordEntry[];

export function chordsForKey(keySlug: string): ChordEntry[] {
  return CHORDS.filter((c) => c.key === keySlug);
}

export function chordsForQuality(qualitySlug: string): ChordEntry[] {
  return CHORDS.filter((c) => c.quality === qualitySlug);
}

export function findChord(keySlug: string, qualitySlug: string): ChordEntry | undefined {
  return CHORDS.find((c) => c.key === keySlug && c.quality === qualitySlug);
}
