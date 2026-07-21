# Chord Book

An offline Android guitar chord reference app: browse chords by key or
by type, view moveable barre shapes, see common chord progressions,
and search by chord name.

All chord voicings are generated algorithmically (a fretboard search
over standard EADGBe tuning) from standard interval formulas -- this
is original, generic music-theory data, not reproduced from any
published book.

## Stack

- Next.js 14 (static export) + Tailwind CSS
- Capacitor 6 (Android wrapper)
- Chord data generated at build time by `scripts/generateChords.ts`

## Project layout

```
src/lib/chordTheory.ts          note names, key list, chord-quality formulas
src/lib/fretboardSolver.ts      brute-force fretboard voicing finder
src/lib/moveableAndProgressions.ts  moveable shapes + progressions data
scripts/generateChords.ts       build-time script -> src/data/chords.json
src/app/                        pages (keys, chord detail, types, moveable, progressions, search)
src/components/ChordDiagram.tsx SVG fretboard renderer
android/                        Capacitor Android native project
.github/workflows/android-build.yml   CI build -> debug APK artifact
```

## Building via GitHub Actions (no local Android SDK needed)

Push to `main` (or run the workflow manually from the Actions tab) and
the `Android Build` workflow will:

1. `npm ci`
2. `npm run build` (regenerates the chord database, then `next build`
   as a static export to `out/`)
3. `npx cap sync android` (copies the web build into the native project)
4. Build `app-debug.apk` with Gradle and upload it as a workflow
   artifact you can download and install.

## Local development (optional)

```
npm install
npm run dev        # http://localhost:3000
```

To regenerate chord data only:

```
npm run gen:chords
```

## Adding more chords

Add or edit entries in `CHORD_QUALITIES` in `src/lib/chordTheory.ts` --
every key x quality combination is generated automatically by the
solver, so a new chord type only needs its interval formula.
