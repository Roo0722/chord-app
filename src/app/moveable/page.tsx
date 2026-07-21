import { MOVEABLE_SHAPES } from "@/lib/moveableAndProgressions";
import ChordDiagram from "@/components/ChordDiagram";

export default function MoveablePage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">Moveable shapes</h2>
      <p className="text-sm text-wood-800 mb-4">
        Slide any of these up and down the neck. The lowest note shown is the root -
        line it up with the key you want on the fretboard.
      </p>
      <div className="space-y-6">
        {MOVEABLE_SHAPES.map((shape) => (
          <div key={shape.slug} className="bg-white rounded-lg border border-wood-200 p-4">
            <h3 className="font-semibold">{shape.name}</h3>
            <p className="text-xs text-wood-800 mb-2">
              Root: {shape.rootString} - {shape.description}
            </p>
            <div className="flex justify-center">
              <ChordDiagram
                frets={shape.relativeFrets.map((f) => (f === null ? null : f + 1))}
                fingers={shape.fingers}
                baseFret={1}
                name={shape.name}
                size={190}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
