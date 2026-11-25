/* Небольшие декоративные SVG-иллюстрации. Все — aria-hidden, компактные, без горизонтального переполнения. */

type P = { className?: string; style?: React.CSSProperties };
const base = { "aria-hidden": true, focusable: false } as const;

export function Cloud({ className = "", style, color = "#ffffff", shade = "#e8f6fd" }: P & { color?: string; shade?: string }) {
  return (
    <svg {...base} viewBox="0 0 120 64" className={className} style={style}>
      <path
        d="M22 58 C9 58 3 49 6 40 C8 32 16 28 23 30 C23 17 35 9 47 13 C53 3 72 1 80 13 C92 10 104 19 102 31 C112 32 118 41 115 49 C113 55 108 58 101 58 Z"
        fill={shade}
        transform="translate(2 3)"
      />
      <path
        d="M22 58 C9 58 3 49 6 40 C8 32 16 28 23 30 C23 17 35 9 47 13 C53 3 72 1 80 13 C92 10 104 19 102 31 C112 32 118 41 115 49 C113 55 108 58 101 58 Z"
        fill={color}
      />
    </svg>
  );
}

export function Sun({ className = "", style, face = true }: P & { face?: boolean }) {
  const rays = Array.from({ length: 12 }, (_, i) => i * 30);
  return (
    <svg {...base} viewBox="0 0 120 120" className={className} style={style}>
      <g className="origin-center animate-spin-slow" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        {rays.map((a) => (
          <path key={a} d="M60 6 C64 14 64 18 60 24 C56 18 56 14 60 6 Z" fill="#f8c66a" transform={`rotate(${a} 60 60)`} />
        ))}
      </g>
      <circle cx="60" cy="60" r="31" fill="#f5b041" />
      <circle cx="52" cy="51" r="17" fill="#ffd98a" opacity="0.55" />
      {face && (
        <g>
          <path d="M47 58 Q51 53 55 58" stroke="#8a5a12" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M65 58 Q69 53 73 58" stroke="#8a5a12" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M51 67 Q60 75 69 67" stroke="#8a5a12" strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="45" cy="66" r="4" fill="#f2896a" opacity="0.55" />
          <circle cx="75" cy="66" r="4" fill="#f2896a" opacity="0.55" />
        </g>
      )}
    </svg>
  );
}

/** Стилизованные горы Заилийского Алатау со снежными шапками. */
export function Mountains({ className = "", style }: P) {
  return (
    <svg {...base} viewBox="0 0 600 160" preserveAspectRatio="none" className={className} style={style}>
      <path d="M0 160 L0 98 L70 46 L120 82 L190 22 L262 90 L318 54 L392 112 L452 40 L520 92 L600 58 L600 160 Z" fill="#bfe6f6" />
      <path d="M166 44 L190 22 L214 45 L203 41 L194 50 L184 40 Z M432 58 L452 40 L472 59 L462 55 L452 63 L442 55 Z" fill="#ffffff" />
      <path d="M0 160 L0 118 L60 84 L130 124 L214 70 L300 126 L380 90 L470 132 L540 100 L600 122 L600 160 Z" fill="#a8dca3" />
      <path d="M0 160 L0 140 C80 120 150 150 240 136 C330 122 420 152 600 132 L600 160 Z" fill="#8ccb87" />
    </svg>
  );
}

export function Yurt({ className = "", style }: P) {
  return (
    <svg {...base} viewBox="0 0 120 100" className={className} style={style}>
      <ellipse cx="60" cy="95" rx="52" ry="5" fill="#34454a" opacity="0.08" />
      <path d="M14 56 C22 30 40 18 60 18 C80 18 98 30 106 56 Z" fill="#fff7e6" stroke="#e99560" strokeWidth="3" />
      <path d="M24 56 L24 92 L96 92 L96 56 Z" fill="#fffaf0" stroke="#e99560" strokeWidth="3" strokeLinejoin="round" />
      <path d="M24 66 L96 66" stroke="#67c8c7" strokeWidth="5" />
      <path d="M30 66 l6 -4 l6 4 l6 -4 l6 4 l6 -4 l6 4 l6 -4 l6 4 l6 -4 l6 4 l6 -4" stroke="#fff" strokeWidth="1.6" fill="none" />
      <path d="M50 92 L50 72 C50 66 70 66 70 72 L70 92 Z" fill="#e99560" />
      <path d="M60 74 C56 78 56 82 60 84 C64 82 64 78 60 74 Z" fill="#f5b041" />
      <path d="M48 20 C52 12 68 12 72 20" stroke="#e99560" strokeWidth="3" fill="none" />
      <path d="M38 40 C46 34 54 32 60 32 C66 32 74 34 82 40" stroke="#f5b041" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Flower({ className = "", style, petal = "#e99560", center = "#f5b041" }: P & { petal?: string; center?: string }) {
  return (
    <svg {...base} viewBox="0 0 48 48" className={className} style={style}>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="24" cy="12" rx="8" ry="10.5" fill={petal} transform={`rotate(${a} 24 24)`} />
      ))}
      <circle cx="24" cy="24" r="7" fill={center} />
      <circle cx="21.5" cy="21.5" r="2" fill="#fff" opacity="0.7" />
    </svg>
  );
}

export function Butterfly({ className = "", style, a = "#91d5f5", b = "#e99560" }: P & { a?: string; b?: string }) {
  return (
    <svg {...base} viewBox="0 0 48 40" className={className} style={style}>
      <g className="animate-flap" style={{ transformOrigin: "24px 20px" }}>
        <path d="M23 18 C14 2 2 6 4 16 C5 24 16 24 23 20 Z" fill={a} />
        <path d="M25 18 C34 2 46 6 44 16 C43 24 32 24 25 20 Z" fill={a} />
        <path d="M23 21 C14 24 8 34 14 36 C19 38 23 30 23 23 Z" fill={b} />
        <path d="M25 21 C34 24 40 34 34 36 C29 38 25 30 25 23 Z" fill={b} />
      </g>
      <rect x="22.6" y="14" width="2.8" height="18" rx="1.4" fill="#34454a" />
      <path d="M23 14 C21 9 18 7 16 7 M25 14 C27 9 30 7 32 7" stroke="#34454a" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Star({ className = "", style, color = "#f5b041" }: P & { color?: string }) {
  return (
    <svg {...base} viewBox="0 0 40 40" className={className} style={style}>
      <path
        d="M20 3 C21.6 3 22.4 10.5 24.6 13.4 C27 16.4 36 15.7 36.6 17.3 C37.2 19 30.4 23.4 29.4 27 C28.4 30.6 32.4 36.5 31 37.5 C29.6 38.5 23.6 33.2 20 33.2 C16.4 33.2 10.4 38.5 9 37.5 C7.6 36.5 11.6 30.6 10.6 27 C9.6 23.4 2.8 19 3.4 17.3 C4 15.7 13 16.4 15.4 13.4 C17.6 10.5 18.4 3 20 3 Z"
        fill={color}
      />
    </svg>
  );
}

export function Sparkle({ className = "", style, color = "#67c8c7" }: P & { color?: string }) {
  return (
    <svg {...base} viewBox="0 0 24 24" className={className} style={style}>
      <path d="M12 1 C13 8 16 11 23 12 C16 13 13 16 12 23 C11 16 8 13 1 12 C8 11 11 8 12 1 Z" fill={color} />
    </svg>
  );
}

export function Balloon({ className = "", style, color = "#e99560" }: P & { color?: string }) {
  return (
    <svg {...base} viewBox="0 0 40 90" className={className} style={style}>
      <path d="M20 52 C18 62 24 68 19 76 C15 82 21 86 20 90" stroke="#34454a" strokeOpacity="0.45" strokeWidth="1.4" fill="none" />
      <path d="M20 2 C31 2 38 11 38 23 C38 37 28 49 20 51 C12 49 2 37 2 23 C2 11 9 2 20 2 Z" fill={color} />
      <path d="M17 51 L23 51 L21 55 L19 55 Z" fill={color} />
      <ellipse cx="13" cy="17" rx="4" ry="7" fill="#fff" opacity="0.45" transform="rotate(20 13 17)" />
    </svg>
  );
}

/** Казахский орнамент «қошқар мүйіз» (бараний рог) — используется умеренно. */
export function Ornament({ className = "", style, color = "#67c8c7", width = 3 }: P & { color?: string; width?: number }) {
  return (
    <svg {...base} viewBox="0 0 64 44" className={className} style={style}>
      <path
        d="M32 42 L32 20 M32 20 C32 8 20 3 13 9 C6 15 11 25 18 22 C23 20 21 13 17 14 M32 20 C32 8 44 3 51 9 C58 15 53 25 46 22 C41 20 43 13 47 14 M24 34 C18 34 14 38 12 42 M40 34 C46 34 50 38 52 42"
        stroke={color}
        strokeWidth={width}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Орнаментальная лента из повторяющихся завитков. */
export function OrnamentBand({ className = "", style, color = "#67c8c7" }: P & { color?: string }) {
  return (
    <svg {...base} viewBox="0 0 240 24" preserveAspectRatio="xMidYMid meet" className={className} style={style}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path
          key={i}
          transform={`translate(${i * 40} 0)`}
          d="M20 22 L20 12 C20 5 13 3 9 6 C5 9 8 15 12 13 C14 12 13 9 11 9.5 M20 12 C20 5 27 3 31 6 C35 9 32 15 28 13 C26 12 27 9 29 9.5"
          stroke={color}
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

/** Волнистая линия-разделитель. */
export function WavyLine({ className = "", style, color = "#f5b041" }: P & { color?: string }) {
  return (
    <svg {...base} viewBox="0 0 120 14" className={className} style={style}>
      <path d="M2 7 C12 0 22 0 32 7 C42 14 52 14 62 7 C72 0 82 0 92 7 C102 14 112 14 118 9" stroke={color} strokeWidth="3.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** Волна на границе секций (во всю ширину, без переполнения). */
export function WaveEdge({ className = "", fill = "#ffffff", flip = false }: { className?: string; fill?: string; flip?: boolean }) {
  return (
    <svg
      {...base}
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      className={`pointer-events-none block h-[28px] w-full lg:h-[44px] ${className}`}
      style={flip ? { transform: "scaleY(-1)" } : undefined}
    >
      <path d="M0 32 C180 4 360 4 540 26 C720 48 900 56 1080 34 C1260 12 1350 14 1440 26 L1440 60 L0 60 Z" fill={fill} />
    </svg>
  );
}

/* ---------- Игрушки, книжки, канцелярия ---------- */

export function Cube({ className = "", style, color = "#f5b041", letter = "А" }: P & { color?: string; letter?: string }) {
  return (
    <svg {...base} viewBox="0 0 44 44" className={className} style={style}>
      <path d="M6 12 L22 4 L38 12 L22 20 Z" fill="#fff" opacity="0.55" />
      <path d="M6 12 L22 20 L22 40 L6 32 Z" fill={color} />
      <path d="M38 12 L22 20 L22 40 L38 32 Z" fill={color} style={{ filter: "brightness(0.86)" }} />
      <path d="M6 12 L22 4 L38 12 L22 20 Z" fill={color} style={{ filter: "brightness(1.12)" }} />
      <text x="14" y="30" fontSize="11" fontWeight="900" fill="#fff" textAnchor="middle" fontFamily="var(--font-nunito), sans-serif">
        {letter}
      </text>
    </svg>
  );
}

export function BookIcon({ className = "", style, color = "#67c8c7" }: P & { color?: string }) {
  return (
    <svg {...base} viewBox="0 0 56 40" className={className} style={style}>
      <path d="M28 8 C20 3 10 3 3 6 L3 36 C10 33 20 33 28 38 Z" fill="#fff" stroke={color} strokeWidth="3" strokeLinejoin="round" />
      <path d="M28 8 C36 3 46 3 53 6 L53 36 C46 33 36 33 28 38 Z" fill="#fff" stroke={color} strokeWidth="3" strokeLinejoin="round" />
      <path d="M9 13 C14 12 19 12 23 14 M9 20 C14 19 19 19 23 21 M33 14 C37 12 42 12 47 13 M33 21 C37 19 42 19 47 20" stroke={color} strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Pencil({ className = "", style, color = "#e99560" }: P & { color?: string }) {
  return (
    <svg {...base} viewBox="0 0 60 16" className={className} style={style}>
      <rect x="10" y="2" width="40" height="12" rx="2" fill={color} />
      <rect x="10" y="2" width="40" height="4" rx="2" fill="#fff" opacity="0.35" />
      <path d="M50 2 L59 8 L50 14 Z" fill="#fbe6b9" />
      <path d="M56 6 L59 8 L56 10 Z" fill="#34454a" />
      <rect x="3" y="2" width="8" height="12" rx="3" fill="#f7a8b8" />
    </svg>
  );
}

export function Ball({ className = "", style }: P) {
  return (
    <svg {...base} viewBox="0 0 40 40" className={className} style={style}>
      <circle cx="20" cy="20" r="18" fill="#91d5f5" />
      <path d="M20 2 C28 10 28 30 20 38 C12 30 12 10 20 2 Z" fill="#f5b041" />
      <path d="M2 20 C10 15 30 15 38 20 C30 25 10 25 2 20 Z" fill="#e99560" opacity="0.85" />
      <circle cx="13" cy="12" r="4" fill="#fff" opacity="0.55" />
    </svg>
  );
}

export function Pyramid({ className = "", style }: P) {
  return (
    <svg {...base} viewBox="0 0 40 50" className={className} style={style}>
      <rect x="18" y="2" width="4" height="44" rx="2" fill="#c98a4c" />
      <ellipse cx="20" cy="42" rx="17" ry="6" fill="#e99560" />
      <ellipse cx="20" cy="33" rx="14" ry="5.5" fill="#f5b041" />
      <ellipse cx="20" cy="24" rx="11" ry="5" fill="#8ccb87" />
      <ellipse cx="20" cy="15.5" rx="8" ry="4.5" fill="#67c8c7" />
      <circle cx="20" cy="7" r="5" fill="#91d5f5" />
    </svg>
  );
}

export function Paper({ className = "", style, color = "#91d5f5" }: P & { color?: string }) {
  return (
    <svg {...base} viewBox="0 0 40 50" className={className} style={style}>
      <path d="M4 4 L28 4 L36 12 L36 46 L4 46 Z" fill="#fff" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M28 4 L28 12 L36 12" fill="#eef9fe" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M10 20 L30 20 M10 27 L30 27 M10 34 L24 34" stroke={color} strokeOpacity="0.6" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- Еда ---------- */

export function FoodFruits({ className = "" }: P) {
  return (
    <svg {...base} viewBox="0 0 80 80" className={className}>
      <circle cx="32" cy="46" r="17" fill="#ef6f5c" />
      <path d="M32 30 C32 24 35 21 38 20" stroke="#6b4a2a" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M38 22 C44 16 52 18 52 18 C50 25 43 27 38 22 Z" fill="#8ccb87" />
      <ellipse cx="25" cy="40" rx="4" ry="6" fill="#fff" opacity="0.4" />
      <circle cx="54" cy="52" r="13" fill="#f5b041" />
      <circle cx="50" cy="48" r="3" fill="#fff" opacity="0.45" />
      <path d="M54 39 l2 -4" stroke="#6b4a2a" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function FoodVegetables({ className = "" }: P) {
  return (
    <svg {...base} viewBox="0 0 80 80" className={className}>
      <path d="M22 26 C30 30 40 44 44 62 C45 66 42 68 39 66 C26 56 18 42 18 30 C18 27 20 25 22 26 Z" fill="#f08c3c" />
      <path d="M24 34 L28 33 M28 42 L33 40 M33 51 L38 49" stroke="#c9641f" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 27 C14 20 14 12 16 10 C20 14 22 20 22 26 Z M22 26 C22 16 28 10 32 10 C31 17 27 23 22 26 Z" fill="#8ccb87" />
      <circle cx="56" cy="46" r="9" fill="#6bb664" />
      <circle cx="49" cy="40" r="8" fill="#7cc475" />
      <circle cx="61" cy="37" r="8" fill="#8ccb87" />
      <path d="M55 52 L55 66" stroke="#9ad18c" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

export function FoodMilk({ className = "" }: P) {
  return (
    <svg {...base} viewBox="0 0 80 80" className={className}>
      <path d="M26 24 L40 14 L54 24 L54 66 C54 69 52 70 49 70 L31 70 C28 70 26 69 26 66 Z" fill="#ffffff" stroke="#91d5f5" strokeWidth="3" strokeLinejoin="round" />
      <path d="M26 24 L54 24" stroke="#91d5f5" strokeWidth="3" />
      <path d="M26 40 C34 36 46 44 54 40 L54 58 L26 58 Z" fill="#91d5f5" opacity="0.8" />
      <circle cx="40" cy="50" r="5" fill="#fff" />
      <path d="M40 14 L40 8 L46 8" stroke="#91d5f5" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function FoodPorridge({ className = "" }: P) {
  return (
    <svg {...base} viewBox="0 0 80 80" className={className}>
      <path d="M30 18 C26 13 34 10 30 5 M42 18 C38 13 46 10 42 5" stroke="#e99560" strokeOpacity="0.55" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="40" cy="38" rx="28" ry="8" fill="#fbe6b9" />
      <circle cx="32" cy="36" r="3.4" fill="#f5b041" />
      <circle cx="44" cy="35" r="3" fill="#ef6f5c" />
      <circle cx="51" cy="39" r="2.6" fill="#8b5cf6" opacity="0.7" />
      <path d="M12 38 C12 56 24 66 40 66 C56 66 68 56 68 38 Z" fill="#67c8c7" />
      <path d="M20 48 C28 52 52 52 60 48" stroke="#fff" strokeWidth="2.5" strokeDasharray="2 5" strokeLinecap="round" fill="none" />
      <path d="M58 30 L72 12" stroke="#c98a4c" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function FoodBerries({ className = "" }: P) {
  return (
    <svg {...base} viewBox="0 0 80 80" className={className}>
      <path d="M26 30 C30 22 40 22 42 30 C46 40 36 56 32 56 C28 56 20 42 26 30 Z" fill="#ef5a6f" />
      <path d="M26 28 C30 24 36 24 40 28 L34 22 Z" fill="#8ccb87" />
      {[[29, 36], [36, 36], [32, 43], [27, 44], [37, 46]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.2" fill="#ffe29a" />
      ))}
      <circle cx="52" cy="46" r="7" fill="#6d7fd6" />
      <circle cx="60" cy="54" r="7" fill="#5a6cc4" />
      <circle cx="50" cy="58" r="7" fill="#7b8de0" />
      <circle cx="50" cy="44" r="2" fill="#fff" opacity="0.5" />
    </svg>
  );
}
