"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CHORDS } from "@/lib/chordData";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return CHORDS.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 40);
  }, [query]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Search chords</h2>
      <input
        autoFocus
        type="text"
        placeholder="e.g. Cmaj7, F#m, Bb7"
        className="w-full rounded-md border border-wood-200 bg-white px-3 py-2 mb-4"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="grid grid-cols-2 gap-2">
        {results.map((c) => (
          <Link
            key={`${c.key}-${c.quality}`}
            href={`/chord/${c.key}/${c.quality}/`}
            className="rounded-md border border-wood-200 bg-white px-3 py-2 text-sm hover:bg-wood-100"
          >
            {c.name} <span className="text-wood-800/70">- {c.qualityLabel}</span>
          </Link>
        ))}
      </div>
      {query && results.length === 0 && (
        <p className="text-sm text-wood-800">No matches. Try a different spelling (e.g. &ldquo;F#&rdquo; not &ldquo;Gb&rdquo;).</p>
      )}
    </div>
  );
}
