interface ChordDiagramProps {
  frets: (number | null)[]; // low E (string 6) to high e (string 1)
  fingers: (number | null)[];
  baseFret: number;
  name: string;
  size?: number;
}

const STRING_COUNT = 6;
const FRET_COUNT = 4;

export default function ChordDiagram({ frets, fingers, baseFret, name, size = 220 }: ChordDiagramProps) {
  const width = size;
  const height = size * 1.15;
  const padTop = height * 0.16;
  const padSide = width * 0.12;
  const gridW = width - padSide * 2;
  const gridH = height * 0.62;
  const stringGap = gridW / (STRING_COUNT - 1);
  const fretGap = gridH / FRET_COUNT;

  const xForString = (s: number) => padSide + s * stringGap; // s: 0 = low E .. 5 = high e
  const yForFret = (f: number) => padTop + f * fretGap; // f: 0 = nut/top line .. FRET_COUNT

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      style={{ maxWidth: size }}
      role="img"
      aria-label={`Chord diagram for ${name}`}
    >
      {/* Chord name */}
      <text
        x={width / 2}
        y={padTop * 0.6}
        textAnchor="middle"
        fontSize={size * 0.11}
        fontWeight={700}
        fill="var(--diagram-fg, #2e1c11)"
      >
        {name}
      </text>

      {/* Base fret label */}
      {baseFret > 1 && (
        <text
          x={padSide - 14}
          y={yForFret(0.8)}
          textAnchor="end"
          fontSize={size * 0.07}
          fill="var(--diagram-fg, #2e1c11)"
        >
          {baseFret}fr
        </text>
      )}

      {/* Nut (thick top line) or top fret line */}
      <rect
        x={padSide}
        y={padTop}
        width={gridW}
        height={baseFret === 1 ? 4 : 1.5}
        fill="var(--diagram-fg, #2e1c11)"
      />

      {/* Fret lines */}
      {Array.from({ length: FRET_COUNT + 1 }).map((_, i) => (
        <line
          key={`fret-${i}`}
          x1={padSide}
          x2={padSide + gridW}
          y1={yForFret(i)}
          y2={yForFret(i)}
          stroke="var(--diagram-fg, #2e1c11)"
          strokeWidth={1}
        />
      ))}

      {/* Strings */}
      {Array.from({ length: STRING_COUNT }).map((_, s) => (
        <line
          key={`string-${s}`}
          x1={xForString(s)}
          x2={xForString(s)}
          y1={padTop}
          y2={padTop + gridH}
          stroke="var(--diagram-fg, #2e1c11)"
          strokeWidth={1}
        />
      ))}

      {/* Open / muted markers above the nut */}
      {frets.map((f, i) => {
        const x = xForString(i);
        const y = padTop - 10;
        if (f === null) {
          return (
            <text key={`mark-${i}`} x={x} y={y} textAnchor="middle" fontSize={size * 0.08} fill="var(--diagram-fg, #2e1c11)">
              x
            </text>
          );
        }
        if (f === 0) {
          return (
            <circle
              key={`mark-${i}`}
              cx={x}
              cy={y - 4}
              r={size * 0.028}
              fill="none"
              stroke="var(--diagram-fg, #2e1c11)"
              strokeWidth={1.5}
            />
          );
        }
        return null;
      })}

      {/* Finger dots */}
      {frets.map((f, i) => {
        if (f === null || f === 0) return null;
        const relativeFret = baseFret === 1 ? f : f - baseFret + 1;
        if (relativeFret < 1 || relativeFret > FRET_COUNT) return null;
        const x = xForString(i);
        const y = yForFret(relativeFret - 1) + fretGap / 2;
        const finger = fingers[i];
        return (
          <g key={`dot-${i}`}>
            <circle cx={x} cy={y} r={size * 0.055} fill="var(--diagram-fg, #2e1c11)" />
            {finger ? (
              <text
                x={x}
                y={y + size * 0.02}
                textAnchor="middle"
                fontSize={size * 0.06}
                fontWeight={700}
                fill="var(--diagram-bg, #faf6f0)"
              >
                {finger}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}
