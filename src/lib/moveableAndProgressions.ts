// Generic, widely-known moveable barre-chord shapes and common chord
// progressions. These are standard music-theory / guitar-pedagogy
// knowledge (E-shape and A-shape barre chords, I-IV-V etc.) and are not
// taken from any specific publication.

export interface MoveableShape {
  slug: string;
  name: string;
  rootString: "6th string (low E)" | "5th string (A)";
  description: string;
  // Fret offsets relative to the barre (0 = barre fret itself), one per string, low E to high e. null = muted/not part of shape.
  relativeFrets: (number | null)[];
  fingers: (number | null)[];
}

export const MOVEABLE_SHAPES: MoveableShape[] = [
  {
    slug: "e-shape-major",
    name: "Major (E-shape)",
    rootString: "6th string (low E)",
    description: "Barre across all six strings at any fret; root note on the low E string.",
    relativeFrets: [0, 2, 2, 1, 0, 0],
    fingers: [1, 3, 4, 2, 1, 1],
  },
  {
    slug: "e-shape-minor",
    name: "Minor (Em-shape)",
    rootString: "6th string (low E)",
    description: "Barre shape based on the open Em chord.",
    relativeFrets: [0, 2, 2, 0, 0, 0],
    fingers: [1, 3, 4, 1, 1, 1],
  },
  {
    slug: "e-shape-seventh",
    name: "Seventh (E7-shape)",
    rootString: "6th string (low E)",
    description: "Barre shape based on the open E7 chord.",
    relativeFrets: [0, 2, 0, 1, 0, 0],
    fingers: [1, 3, 1, 2, 1, 1],
  },
  {
    slug: "e-shape-minor-seventh",
    name: "Minor 7 (Em7-shape)",
    rootString: "6th string (low E)",
    description: "Barre shape based on the open Em7 chord.",
    relativeFrets: [0, 2, 0, 0, 0, 0],
    fingers: [1, 3, 1, 1, 1, 1],
  },
  {
    slug: "e-shape-major-seventh",
    name: "Major 7 (Emaj7-shape)",
    rootString: "6th string (low E)",
    description: "Barre shape based on the open Emaj7 chord.",
    relativeFrets: [0, 2, 1, 1, 0, 0],
    fingers: [1, 3, 2, 2, 1, 1],
  },
  {
    slug: "a-shape-major",
    name: "Major (A-shape)",
    rootString: "5th string (A)",
    description: "Barre shape based on the open A chord; root note on the A string.",
    relativeFrets: [null, 0, 2, 2, 2, 0],
    fingers: [null, 1, 2, 3, 4, 1],
  },
  {
    slug: "a-shape-minor",
    name: "Minor (Am-shape)",
    rootString: "5th string (A)",
    description: "Barre shape based on the open Am chord.",
    relativeFrets: [null, 0, 2, 2, 1, 0],
    fingers: [null, 1, 3, 4, 2, 1],
  },
  {
    slug: "a-shape-seventh",
    name: "Seventh (A7-shape)",
    rootString: "5th string (A)",
    description: "Barre shape based on the open A7 chord.",
    relativeFrets: [null, 0, 2, 0, 2, 0],
    fingers: [null, 1, 3, 1, 4, 1],
  },
  {
    slug: "a-shape-minor-seventh",
    name: "Minor 7 (Am7-shape)",
    rootString: "5th string (A)",
    description: "Barre shape based on the open Am7 chord.",
    relativeFrets: [null, 0, 2, 0, 1, 0],
    fingers: [null, 1, 3, 1, 2, 1],
  },
  {
    slug: "a-shape-major-seventh",
    name: "Major 7 (Amaj7-shape)",
    rootString: "5th string (A)",
    description: "Barre shape based on the open Amaj7 chord.",
    relativeFrets: [null, 0, 2, 1, 2, 0],
    fingers: [null, 1, 3, 2, 4, 1],
  },
  {
    slug: "power-chord",
    name: "Power chord (5)",
    rootString: "6th string (low E)",
    description: "Root + fifth only, movable on the low E or A string; no major/minor quality.",
    relativeFrets: [0, 2, 2, null, null, null],
    fingers: [1, 3, 4, null, null, null],
  },
];

export interface Progression {
  slug: string;
  name: string;
  romanNumerals: string;
  degrees: number[]; // scale degree roots in semitones from the key's tonic
  qualities: ("major" | "minor" | "dim")[];
  description: string;
}

export const PROGRESSIONS: Progression[] = [
  {
    slug: "i-iv-v",
    name: "I - IV - V",
    romanNumerals: "I - IV - V",
    degrees: [0, 5, 7],
    qualities: ["major", "major", "major"],
    description: "The most common progression in popular music, blues, and folk.",
  },
  {
    slug: "i-v-vi-iv",
    name: "I - V - vi - IV",
    romanNumerals: "I - V - vi - IV",
    degrees: [0, 7, 9, 5],
    qualities: ["major", "major", "minor", "major"],
    description: "The 'pop-punk' progression heard in countless hit songs.",
  },
  {
    slug: "ii-v-i",
    name: "ii - V - I",
    romanNumerals: "ii - V - I",
    degrees: [2, 7, 0],
    qualities: ["minor", "major", "major"],
    description: "The backbone of jazz harmony.",
  },
  {
    slug: "i-vi-iv-v",
    name: "I - vi - IV - V",
    romanNumerals: "I - vi - IV - V",
    degrees: [0, 9, 5, 7],
    qualities: ["major", "minor", "major", "major"],
    description: "The classic '50s doo-wop progression.",
  },
  {
    slug: "twelve-bar-blues",
    name: "12-Bar Blues (I-IV-V)",
    romanNumerals: "I - I - I - I - IV - IV - I - I - V - IV - I - V",
    degrees: [0, 0, 0, 0, 5, 5, 0, 0, 7, 5, 0, 7],
    qualities: ["major", "major", "major", "major", "major", "major", "major", "major", "major", "major", "major", "major"],
    description: "The standard 12-bar blues form, all dominant-flavored chords.",
  },
  {
    slug: "i-iv-v-i-minor",
    name: "i - iv - v - i (minor)",
    romanNumerals: "i - iv - v - i",
    degrees: [0, 5, 7, 0],
    qualities: ["minor", "minor", "minor", "minor"],
    description: "A natural-minor take on the I-IV-V shape.",
  },
  {
    slug: "vi-iv-i-v",
    name: "vi - IV - I - V",
    romanNumerals: "vi - IV - I - V",
    degrees: [9, 5, 0, 7],
    qualities: ["minor", "major", "major", "major"],
    description: "Same four chords as I-V-vi-IV, starting from the relative minor.",
  },
];
