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

## Signing a release build

Debug builds (`app-debug.apk`) install fine for testing but use a
throw-away debug key. For a real release you need your own signing
key so future updates can install over the old app.

**1. Generate a keystore** (do this once, in Termux):

```
pkg install openjdk-17
keytool -genkeypair -v -keystore chord-book-release.keystore \
  -alias chordbook -keyalg RSA -keysize 2048 -validity 10000
```

It'll prompt for a store password, a key password, and your name/org
(any values are fine). **Back up this `.keystore` file somewhere safe
outside git** -- if you lose it, you can never publish an update under
the same app identity again.

**2. Base64-encode it and add GitHub repo secrets:**

```
base64 -w 0 chord-book-release.keystore
```

Go to your repo -> Settings -> Secrets and variables -> Actions, and
add:

- `ANDROID_KEYSTORE_BASE64` -- the base64 output from above
- `ANDROID_KEYSTORE_PASSWORD` -- the store password you set
- `ANDROID_KEY_ALIAS` -- `chordbook` (or whatever alias you used)
- `ANDROID_KEY_PASSWORD` -- the key password you set

**3. Push.** The workflow detects the secrets automatically and adds a
`Build signed release APK` step, uploading `chord-book-release-apk` as
a separate artifact alongside the debug build. No secrets set yet? The
release steps are skipped and you still get the debug APK as before.

For local/manual signing instead of CI, copy
`android/keystore.properties.example` to `android/keystore.properties`,
fill in real values, and place the keystore at the path you set for
`storeFile` -- both are gitignored so nothing sensitive gets committed.

