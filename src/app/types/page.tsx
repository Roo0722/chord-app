import Link from "next/link";
import { CHORD_QUALITIES } from "@/lib/chordTheory";

export default function TypesPage() {
  const categories = Array.from(new Set(CHORD_QUALITIES.map((q) => q.category)));

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Chord types</h2>
      {categories.map((category) => (
        <div key={category} className="mb-5">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-wood-800 mb-2">
            {category}
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {CHORD_QUALITIES.filter((q) => q.category === category).map((q) => (
              <Link
                key={q.slug}
                href={`/types/${q.slug}/`}
                className="rounded-md border border-wood-200 bg-white px-3 py-2 text-sm hover:bg-wood-100"
              >
                {q.label}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
