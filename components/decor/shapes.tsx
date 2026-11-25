/**
 * Органические фигуры сайта. Все пути заданы в системе координат 100×100,
 * поэтому одинаково используются и как фон (SVG), и как clip-path (objectBoundingBox).
 */

function scallop(petals: number, inner: number, ctrl: number, cx = 50, cy = 50): string {
  const step = (Math.PI * 2) / petals;
  const pt = (r: number, a: number) => `${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`;
  let d = `M${pt(inner, -Math.PI / 2)}`;
  for (let i = 0; i < petals; i++) {
    const a0 = -Math.PI / 2 + i * step;
    d += ` Q${pt(ctrl, a0 + step / 2)} ${pt(inner, a0 + step)}`;
  }
  return d + " Z";
}

export const SHAPES = {
  blobA: "M52 3 C72 2 92 14 96 36 C100 58 92 82 70 93 C50 102 22 96 10 78 C-1 60 2 34 16 18 C25 8 38 3 52 3 Z",
  blobB: "M30 6 C50 -2 80 4 92 22 C103 40 97 64 86 80 C74 97 46 101 26 92 C8 84 0 64 3 44 C5 26 13 13 30 6 Z",
  blobC: "M44 4 C62 0 74 10 86 18 C98 27 100 46 96 62 C92 80 78 96 58 98 C38 100 18 92 8 76 C-2 60 2 40 10 26 C18 12 28 7 44 4 Z",
  cloud:
    "M12 34 C10 18 26 9 38 15 C45 3 64 2 70 14 C81 7 96 15 94 30 C101 37 101 53 95 61 C100 73 92 90 77 89 C70 98 52 99 45 91 C34 98 17 95 13 83 C2 79 -1 63 5 55 C-1 47 2 36 12 34 Z",
  drop: "M50 1 C68 18 95 40 95 64 C95 86 75 100 50 100 C25 100 5 86 5 64 C5 40 32 18 50 1 Z",
  arch: "M0 100 L0 46 C0 18 22 0 50 0 C78 0 100 18 100 46 L100 100 Z",
  flower: scallop(9, 41, 61),
  wavy: "M0 7 C11 0 22 0 33 6 C44 12 56 12 67 6 C78 0 89 0 100 7 L100 93 C89 100 78 100 67 94 C56 88 44 88 33 94 C22 100 11 100 0 93 Z",
  leaf: "M0 48 C0 18 18 0 48 0 L100 0 L100 52 C100 82 82 100 52 100 L0 100 Z",
  folder:
    "M4 12 C4 7 7 4 12 4 L36 4 C40 4 42 6 44 9 L47 14 L88 14 C93 14 96 17 96 22 L96 88 C96 93 93 96 88 96 L12 96 C7 96 4 93 4 88 Z",
  wavyCard:
    "M6 10 C18 2 30 6 42 4 C56 2 70 8 84 4 C94 2 98 10 97 22 C96 40 99 58 97 76 C96 90 90 97 78 96 C62 95 48 99 32 96 C18 94 6 98 4 84 C2 66 5 48 3 30 C2 20 2 13 6 10 Z",
} as const;

export type ShapeName = keyof typeof SHAPES;

/** Скрытые clipPath-определения — подключаются один раз в layout. */
export function ClipDefs() {
  const ids: [string, ShapeName][] = [
    ["clip-blob-a", "blobA"],
    ["clip-blob-b", "blobB"],
    ["clip-blob-c", "blobC"],
    ["clip-cloud", "cloud"],
    ["clip-drop", "drop"],
    ["clip-arch", "arch"],
    ["clip-flower", "flower"],
    ["clip-wavy", "wavy"],
    ["clip-leaf", "leaf"],
  ];
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
      <defs>
        {ids.map(([id, name]) => (
          <clipPath key={id} id={id} clipPathUnits="objectBoundingBox">
            <path d={SHAPES[name]} transform="scale(0.01)" />
          </clipPath>
        ))}
      </defs>
    </svg>
  );
}

/** Фигура-подложка: растягивается на весь родитель (родитель — relative). */
export function ShapeBg({
  shape,
  fill,
  stroke,
  strokeDash,
  className = "",
  shadow = true,
}: {
  shape: ShapeName;
  fill: string;
  stroke?: string;
  strokeDash?: boolean;
  className?: string;
  shadow?: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="-2 -2 104 104"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-visible ${className}`}
      style={shadow ? { filter: "drop-shadow(0 10px 18px rgba(52,69,74,0.10))" } : undefined}
    >
      <path
        d={SHAPES[shape]}
        fill={fill}
        stroke={stroke}
        strokeWidth={stroke ? 2.5 : 0}
        strokeDasharray={strokeDash ? "9 8" : undefined}
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
      />
    </svg>
  );
}
