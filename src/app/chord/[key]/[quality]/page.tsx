import Link from "next/link";
import { notFound } from "next/navigation";
import { KEYS, CHORD_QUALITIES } from "@/lib/chordTheory";
import { findChord } from "@/lib/chordData";
import ChordDiagram from "@/components/ChordDiagram";

export function generateStaticParams() {
  const params: { key: string; quality: string }[] = [];
  for (const k of KEYS) {
    for (const q of CHORD_QUALITIES) {
      params.push({ key: k.slug, quality: q.slug });
    }
  }
  return params;
}

export default function ChordPage({ params }: { params: { key: string; quality: string } }) {
  const key = KEYS.find((k) => k.slug === params.key);
  const quality = CHORD_QUALITIES.find((q) => q.slug === params.quality);
  if (!key || !quality) return notFound();

  const entry = findChord(params.key, params.quality);

  return (
    <div>
      <div className="text-sm mb-3">
        <Link href={`/keys/${key.slug}/`} className="text-wood-800 underline">
          &larr; {key.label} chords
        </Link>
      </div>
      <h2 className="text-2xl font-bold mb-1">{entry?.name ?? `${key.label} ${quality.label}`}</h2>
      <p className="text-sm text-wood-800 mb-4">{quality.label}</p>

      {entry?.voicing ? (
        <div className="bg-white rounded-lg border border-wood-200 p-4 flex justify-center">
          <ChordDiagram
            frets={entry.voicing.frets}
            fingers={entry.voicing.fingers}
            baseFret={entry.voicing.baseFret}
            name={entry.name}
          />
        </div>
      ) : (
        <p className="text-sm text-wood-800">No playable voicing was found for this chord.</p>
      )}

      <div className="mt-4 text-sm text-wood-800 space-y-1">
        <p>String order shown left-to-right: low E, A, D, G, B, high e.</p>
        <p>An &ldquo;x&rdquo; above a string means don&rsquo;t play it; a circle means play it open.</p>
        <p>Numbers on the dots suggest which finger to use (1 = index, 4 = pinky).</p>
      </div>
    </div>
  );
}
