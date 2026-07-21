import Link from "next/link";
import { KEYS } from "@/lib/chordTheory";

export default function HomePage() {
  return (
    <div>
      <p className="mb-4 text-sm text-wood-800">
        Pick a key to browse every chord type in that key, or use Types, Moveable shapes,
        Progressions, or Search below.
      </p>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-wood-800 mb-2">
        Browse by key
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {KEYS.map((key) => (
          <Link
            key={key.slug}
            href={`/keys/${key.slug}/`}
            className="rounded-lg border border-wood-200 bg-white shadow-sm py-4 text-center font-semibold text-lg hover:bg-wood-100"
          >
            {key.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
