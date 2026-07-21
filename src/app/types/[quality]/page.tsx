import Link from "next/link";
import { notFound } from "next/navigation";
import { CHORD_QUALITIES } from "@/lib/chordTheory";
import { chordsForQuality } from "@/lib/chordData";

export function generateStaticParams() {
  return CHORD_QUALITIES.map((q) => ({ quality: q.slug }));
}

export default function TypeDetailPage({ params }: { params: { quality: string } }) {
  const quality = CHORD_QUALITIES.find((q) => q.slug === params.quality);
  if (!quality) return notFound();

  const chords = chordsForQuality(params.quality);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">{quality.label}</h2>
      <p className="text-sm text-wood-800 mb-4">In every key</p>
      <div className="grid grid-cols-3 gap-2">
        {chords.map((c) => (
          <Link
            key={c.key}
            href={`/chord/${c.key}/${quality.slug}/`}
            className="rounded-md border border-wood-200 bg-white px-2 py-3 text-center text-sm hover:bg-wood-100"
          >
            {c.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
