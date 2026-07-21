"use client";

import { useState } from "react";
import Link from "next/link";
import { KEYS, noteLabel } from "@/lib/chordTheory";
import { PROGRESSIONS } from "@/lib/moveableAndProgressions";

const QUALITY_TO_ROUTE_SLUG: Record<string, string> = {
  major: "major",
  minor: "minor",
  dim: "diminished",
};

export default function ProgressionsPage() {
  const [rootPc, setRootPc] = useState(0);
  const rootKey = KEYS.find((k) => k.pc === rootPc)!;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">Chord progressions</h2>
      <p className="text-sm text-wood-800 mb-3">Pick a key to see each progression spelled out.</p>

      <label className="block text-xs font-semibold uppercase tracking-wide text-wood-800 mb-1">
        Key
      </label>
      <select
        className="mb-5 w-full rounded-md border border-wood-200 bg-white px-3 py-2"
        value={rootPc}
        onChange={(e) => setRootPc(Number(e.target.value))}
      >
        {KEYS.map((k) => (
          <option key={k.slug} value={k.pc}>
            {k.label}
          </option>
        ))}
      </select>

      <div className="space-y-5">
        {PROGRESSIONS.map((prog) => (
          <div key={prog.slug} className="bg-white rounded-lg border border-wood-200 p-4">
            <h3 className="font-semibold">{prog.name}</h3>
            <p className="text-xs text-wood-800 mb-2">{prog.description}</p>
            <div className="flex flex-wrap gap-2">
              {prog.degrees.map((deg, i) => {
                const pc = (rootPc + deg) % 12;
                const quality = prog.qualities[i];
                const label = noteLabel(pc) + (quality === "major" ? "" : quality === "minor" ? "m" : "dim");
                const keySlug = KEYS.find((k) => k.pc === pc)!.slug;
                const qualitySlug = QUALITY_TO_ROUTE_SLUG[quality];
                return (
                  <Link
                    key={i}
                    href={`/chord/${keySlug}/${qualitySlug}/`}
                    className="rounded-md border border-wood-200 px-3 py-1.5 text-sm hover:bg-wood-100"
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-wood-800">Key shown: {rootKey.label}</p>
    </div>
  );
}
