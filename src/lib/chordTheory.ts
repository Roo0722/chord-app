// Core music-theory building blocks. All chord shapes are derived
// algorithmically from standard interval formulas -- nothing here is
// copied from any published chord book.

export const NOTE_NAMES = [
  "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B",
] as const;

export type NoteName = (typeof NOTE_NAMES)[number];

// The 12 keys, using the flat spelling where it's more common on guitar.
export const KEYS: { pc: number; label: string; slug: string }[] = [
  { pc: 0, label: "C", slug: "c" },
  { pc: 1, label: "C#/Db", slug: "c-sharp" },
  { pc: 2, label: "D", slug: "d" },
  { pc: 3, label: "D#/Eb", slug: "d-sharp" },
  { pc: 4, label: "E", slug: "e" },
  { pc: 5, label: "F", slug: "f" },
  { pc: 6, label: "F#/Gb", slug: "f-sharp" },
  { pc: 7, label: "G", slug: "g" },
  { pc: 8, label: "G#/Ab", slug: "g-sharp" },
  { pc: 9, label: "A", slug: "a" },
  { pc: 10, label: "A#/Bb", slug: "a-sharp" },
  { pc: 11, label: "B", slug: "b" },
];

export interface ChordQuality {
  slug: string;
  label: string;
  suffix: string; // e.g. "m7", "maj7", "dim"
  // Semitone offsets from the root that MUST appear in the voicing.
  mustIntervals: number[];
  // Semitone offsets that may appear if the fretboard allows it.
  optionalIntervals: number[];
  category: "Major" | "Minor" | "Seventh" | "Extended" | "Diminished/Augmented";
}

export const CHORD_QUALITIES: ChordQuality[] = [
  { slug: "major", label: "Major", suffix: "", mustIntervals: [0, 4, 7], optionalIntervals: [], category: "Major" },
  { slug: "major-sus2", label: "Major sus2", suffix: "sus2", mustIntervals: [0, 2, 7], optionalIntervals: [], category: "Major" },
  { slug: "major-add9", label: "Major add9", suffix: "add9", mustIntervals: [0, 4, 7, 14], optionalIntervals: [], category: "Major" },
  { slug: "major-sus4", label: "Major sus4", suffix: "sus4", mustIntervals: [0, 5, 7], optionalIntervals: [], category: "Major" },
  { slug: "major-6", label: "Major 6", suffix: "6", mustIntervals: [0, 4, 9], optionalIntervals: [7], category: "Major" },
  { slug: "major-6-9", label: "Major 6/9", suffix: "6/9", mustIntervals: [0, 4, 9, 14], optionalIntervals: [7], category: "Major" },
  { slug: "major-7", label: "Major 7", suffix: "maj7", mustIntervals: [0, 4, 7, 11], optionalIntervals: [], category: "Major" },
  { slug: "seventh", label: "Seventh", suffix: "7", mustIntervals: [0, 4, 7, 10], optionalIntervals: [], category: "Seventh" },
  { slug: "seventh-sus4", label: "Seventh sus4", suffix: "7sus4", mustIntervals: [0, 5, 10], optionalIntervals: [7], category: "Seventh" },
  { slug: "seventh-flat5", label: "Seventh b5", suffix: "7b5", mustIntervals: [0, 4, 6, 10], optionalIntervals: [], category: "Seventh" },
  { slug: "seventh-sharp5", label: "Seventh #5", suffix: "7#5", mustIntervals: [0, 4, 8, 10], optionalIntervals: [], category: "Seventh" },
  { slug: "seventh-flat9", label: "Seventh b9", suffix: "7b9", mustIntervals: [0, 4, 10, 13], optionalIntervals: [7], category: "Seventh" },
  { slug: "seventh-sharp9", label: "Seventh #9", suffix: "7#9", mustIntervals: [0, 4, 10, 15], optionalIntervals: [7], category: "Seventh" },
  { slug: "ninth", label: "Ninth", suffix: "9", mustIntervals: [0, 4, 10, 14], optionalIntervals: [7], category: "Extended" },
  { slug: "eleventh", label: "Eleventh", suffix: "11", mustIntervals: [0, 10, 17], optionalIntervals: [4, 7, 14], category: "Extended" },
  { slug: "thirteenth", label: "Thirteenth", suffix: "13", mustIntervals: [0, 4, 10, 21], optionalIntervals: [7, 14], category: "Extended" },
  { slug: "thirteenth-flat9", label: "Thirteenth b9", suffix: "13b9", mustIntervals: [0, 4, 10, 13, 21], optionalIntervals: [7], category: "Extended" },
  { slug: "augmented", label: "Augmented", suffix: "aug", mustIntervals: [0, 4, 8], optionalIntervals: [], category: "Diminished/Augmented" },
  { slug: "minor", label: "Minor", suffix: "m", mustIntervals: [0, 3, 7], optionalIntervals: [], category: "Minor" },
  { slug: "minor-6", label: "Minor 6", suffix: "m6", mustIntervals: [0, 3, 9], optionalIntervals: [7], category: "Minor" },
  { slug: "minor-7", label: "Minor 7", suffix: "m7", mustIntervals: [0, 3, 7, 10], optionalIntervals: [], category: "Minor" },
  { slug: "minor-7-flat5", label: "Minor 7b5", suffix: "m7b5", mustIntervals: [0, 3, 6, 10], optionalIntervals: [], category: "Minor" },
  { slug: "minor-9", label: "Minor 9", suffix: "m9", mustIntervals: [0, 3, 10, 14], optionalIntervals: [7], category: "Minor" },
  { slug: "minor-major-7", label: "MinorMajor 7", suffix: "m(maj7)", mustIntervals: [0, 3, 7, 11], optionalIntervals: [], category: "Minor" },
  { slug: "minor-11", label: "Minor 11", suffix: "m11", mustIntervals: [0, 3, 10, 17], optionalIntervals: [7, 14], category: "Minor" },
  { slug: "minor-13", label: "Minor 13", suffix: "m13", mustIntervals: [0, 3, 10, 21], optionalIntervals: [7, 14], category: "Minor" },
  { slug: "diminished", label: "Diminished", suffix: "dim", mustIntervals: [0, 3, 6], optionalIntervals: [], category: "Diminished/Augmented" },
  { slug: "diminished-7", label: "Diminished 7", suffix: "dim7", mustIntervals: [0, 3, 6, 9], optionalIntervals: [], category: "Diminished/Augmented" },
];

// Standard tuning, low string (6) to high string (1), as pitch classes.
export const OPEN_STRING_PITCH_CLASSES = [4, 9, 2, 7, 11, 4]; // E A D G B e

export function noteLabel(pc: number): string {
  return NOTE_NAMES[((pc % 12) + 12) % 12];
}

export function chordName(rootLabel: string, quality: ChordQuality): string {
  return `${rootLabel}${quality.suffix}`;
}
