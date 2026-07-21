import Link from "next/link";
import { notFound } from "next/navigation";
import { KEYS, CHORD_QUALITIES } from "@/lib/chordTheory";

export function generateStaticParams() {
  return KEYS.map((k) => ({ key: k.slug }));
}

export default function KeyPage({ params }: { params: { key: string } }) {
  const key = KEYS.find((k) => k.slug === params.key);
  if (!key) return notFound();

  const categories = Array.from(new Set(CHORD_QUALITIES.map((q) => q.category)));

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{key.label} chords</h2>
      {categories.map((category) => (
        <div key={category} className="mb-5">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-wood-800 mb-2">
            {category}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {CHORD_QUALITIES.filter((q) => q.category === category).map((q) => (
              <Link
                key={q.slug}
                href={`/chord/${key.slug}/${q.slug}/`}
                className="rounded-md border border-wood-200 bg-white px-3 py-2 text-sm hover:bg-wood-100"
              >
                {key.label.split("/")[0]}
                {q.suffix} <span className="text-wood-800/70">- {q.label}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
