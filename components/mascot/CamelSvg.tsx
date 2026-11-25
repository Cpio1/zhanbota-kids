/**
 * Временный SVG-маскот «Жанбота» — маленький верблюжонок с бирюзовым шарфиком.
 * Один и тот же персонаж, разные позы и предметы для каждого раздела.
 * Когда появятся PNG в public/images/mascots — они автоматически заменят эти SVG.
 */

export type Pose = "greet" | "wave" | "blocks" | "fruits" | "camera" | "book" | "phone";

const C = {
  body: "#EDC48C",
  shade: "#DCA866",
  light: "#FCE6C3",
  line: "#B98552",
  hoof: "#A9784A",
  ink: "#34454A",
  scarf: "#67C8C7",
  scarfDark: "#3FA7A6",
  blush: "#F59A7E",
};

interface Arm {
  /** Угол в градусах: 0 — лапка вниз, отрицательный — вправо/вверх, положительный — влево/вверх. */
  a: number;
  /** Второй угол для анимации взмаха (если есть). */
  wave?: number;
}

const SHOULDER_L = { x: 66, y: 140 };
const SHOULDER_R = { x: 106, y: 141 };

const POSES: Record<Pose, { l: Arm; r: Arm; gaze: number }> = {
  greet: { l: { a: 132 }, r: { a: -134, wave: -154 }, gaze: 0 },
  wave: { l: { a: 14 }, r: { a: -150, wave: -122 }, gaze: 0 },
  blocks: { l: { a: 22 }, r: { a: -52 }, gaze: 1.5 },
  fruits: { l: { a: -40 }, r: { a: 30 }, gaze: 1 },
  camera: { l: { a: -56 }, r: { a: 50 }, gaze: 0 },
  book: { l: { a: -44 }, r: { a: 40 }, gaze: 3 },
  phone: { l: { a: -28 }, r: { a: -96 }, gaze: 0 },
};

function ArmShape({ shoulder, arm, id }: { shoulder: { x: number; y: number }; arm: Arm; id: string }) {
  const { x, y } = shoulder;
  const style = {
    transform: `rotate(${arm.a}deg)`,
    transformOrigin: `${x}px ${y}px`,
    transformBox: "view-box",
    ["--a0" as string]: `${arm.a}deg`,
    ["--a1" as string]: `${arm.wave ?? arm.a}deg`,
    ["--a2" as string]: `${arm.a + (arm.a < 0 ? 10 : -10)}deg`,
  } as React.CSSProperties;
  return (
    <g style={style} className={arm.wave !== undefined ? "camel-arm-wave" : undefined} data-arm={id}>
      <rect x={x - 7.5} y={y - 5} width="15" height="40" rx="7.5" fill={C.body} stroke={C.line} strokeWidth="2.2" />
      <path d={`M${x - 7.5} ${y + 27} h15 v3 a7.5 7.5 0 0 1 -15 0 Z`} fill={C.hoof} />
    </g>
  );
}

function Eyes({ gaze }: { gaze: number }) {
  return (
    <g>
      {[72, 101].map((cx, i) => (
        <g key={cx}>
          <g className="camel-blink" style={{ transformOrigin: `${cx}px ${70 + gaze}px`, transformBox: "view-box" }}>
            <ellipse cx={cx} cy={70 + gaze} rx="6.6" ry="8.2" fill={C.ink} />
            <circle cx={cx + 2.2} cy={66.6 + gaze} r="2.6" fill="#fff" />
            <circle cx={cx - 2.1} cy={73.4 + gaze} r="1.2" fill="#fff" opacity="0.85" />
          </g>
          <path d={`M${cx - 5.5} ${57} Q${cx} ${53} ${cx + 5.5} ${57}`} stroke={C.ink} strokeOpacity="0.55" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        </g>
      ))}
    </g>
  );
}

function Prop({ pose }: { pose: Pose }) {
  switch (pose) {
    case "blocks":
      return (
        <g>
          <g transform="translate(124 176)">
            <rect width="30" height="30" rx="6" fill="#F5B041" stroke="#C98A1E" strokeWidth="2" />
            <text x="15" y="22" textAnchor="middle" fontSize="18" fontWeight="900" fill="#fff" fontFamily="var(--font-nunito), sans-serif">Ә</text>
          </g>
          <g transform="translate(156 180)">
            <rect width="28" height="28" rx="6" fill="#8CCB87" stroke="#5E9F59" strokeWidth="2" />
            <text x="14" y="21" textAnchor="middle" fontSize="17" fontWeight="900" fill="#fff" fontFamily="var(--font-nunito), sans-serif">Б</text>
          </g>
          <g transform="translate(140 146) rotate(-8 14 14)">
            <rect width="28" height="28" rx="6" fill="#E99560" stroke="#BF6B37" strokeWidth="2" />
            <text x="14" y="21" textAnchor="middle" fontSize="17" fontWeight="900" fill="#fff" fontFamily="var(--font-nunito), sans-serif">А</text>
          </g>
        </g>
      );
    case "fruits":
      return (
        <g>
          <circle cx="76" cy="160" r="9.5" fill="#EF6F5C" />
          <path d="M76 151 q1 -5 4 -6" stroke="#6B4A2A" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M79 147 q6 -4 10 -1 q-4 5 -10 1 Z" fill="#8CCB87" />
          <circle cx="95" cy="158" r="9.5" fill="#F5B041" />
          <circle cx="92" cy="155" r="2.4" fill="#fff" opacity="0.5" />
          {[[108, 160], [114, 160], [111, 165], [105, 165], [117, 165], [108, 170], [114, 170]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3.6" fill="#8B6FD6" />
          ))}
          <path d="M111 156 l2 -5" stroke="#6B4A2A" strokeWidth="1.8" strokeLinecap="round" />
          <ellipse cx="92" cy="172" rx="36" ry="8.5" fill="#fff" stroke={C.scarf} strokeWidth="3" />
          <ellipse cx="92" cy="171" rx="26" ry="4.5" fill="none" stroke={C.scarf} strokeOpacity="0.35" strokeWidth="2" />
        </g>
      );
    case "camera":
      return (
        <g>
          <path d="M70 150 C66 136 74 126 86 124 C98 126 106 136 102 150" stroke={C.ink} strokeOpacity="0.6" strokeWidth="2" fill="none" />
          <rect x="64" y="144" width="48" height="32" rx="8" fill="#91D5F5" stroke="#4C9CC4" strokeWidth="2.2" />
          <rect x="70" y="139" width="14" height="8" rx="3" fill="#4C9CC4" />
          <circle cx="88" cy="160" r="11" fill="#fff" stroke="#4C9CC4" strokeWidth="2.2" />
          <circle cx="88" cy="160" r="6.5" fill={C.ink} />
          <circle cx="90.5" cy="157.5" r="2" fill="#fff" />
          <circle cx="104" cy="150" r="2.6" fill="#F5B041" className="camel-flash" />
        </g>
      );
    case "book":
      return (
        <g>
          <path d="M88 158 C76 151 64 151 56 155 L58 180 C66 177 78 177 88 183 Z" fill="#fff" stroke={C.scarfDark} strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M88 158 C100 151 112 151 120 155 L118 180 C110 177 98 177 88 183 Z" fill="#fff" stroke={C.scarfDark} strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M56 155 L54 184 C66 180 78 181 88 186 C98 181 110 180 122 184 L120 155" fill="none" stroke={C.scarf} strokeWidth="3" strokeLinejoin="round" />
          <path d="M64 162 q10 -2 18 2 M64 169 q10 -2 18 2 M94 164 q8 -4 18 -2 M94 171 q8 -4 18 -2" stroke={C.scarf} strokeOpacity="0.55" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </g>
      );
    case "phone":
      return (
        <g>
          <g transform="rotate(-12 84 168)">
            <rect x="74" y="152" width="20" height="32" rx="5" fill={C.ink} />
            <rect x="77" y="156" width="14" height="22" rx="2.5" fill="#91D5F5" />
            <path d="M80 165 l3 3 l6 -6" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          </g>
          <g className="camel-pin">
            <path d="M170 100 C162 100 157 106 157 113 C157 122 170 134 170 134 C170 134 183 122 183 113 C183 106 178 100 170 100 Z" fill="#E99560" />
            <circle cx="170" cy="113" r="5" fill="#fff" />
          </g>
          <path d="M146 136 q8 -6 12 -14" stroke="#E99560" strokeWidth="2.4" strokeDasharray="2 4" fill="none" strokeLinecap="round" />
        </g>
      );
    case "greet":
      return (
        <g className="camel-hearts">
          <path d="M28 104 c-3 -5 -10 -2 -8 3 c1 3 8 7 8 7 s7 -4 8 -7 c2 -5 -5 -8 -8 -3 Z" fill="#E99560" />
          <path d="M150 92 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2 Z" fill="#F5B041" />
        </g>
      );
    case "wave":
      return (
        <g>
          <path d="M140 96 q6 -4 10 -2 M142 106 q7 -1 10 3" stroke={C.scarfDark} strokeWidth="2.4" fill="none" strokeLinecap="round" className="camel-hearts" />
        </g>
      );
    default:
      return null;
  }
}

export function CamelSvg({ pose, className = "", title }: { pose: Pose; className?: string; title?: string }) {
  const p = POSES[pose];
  // Предметы, которые держат перед собой — рисуются поверх лапок, остальные — после тела.
  const propInFront = pose === "fruits" || pose === "camera" || pose === "book" || pose === "phone";
  return (
    <svg viewBox="0 0 200 220" className={className} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      <ellipse cx="108" cy="212" rx="64" ry="6.5" fill={C.ink} opacity="0.1" />

      {/* хвостик */}
      <path d="M162 160 C176 156 180 170 172 180" stroke={C.line} strokeWidth="5" fill="none" strokeLinecap="round" />
      <circle cx="171" cy="183" r="5.5" fill={C.shade} />

      {/* горбики и тело */}
      <path d="M100 134 C104 104 126 98 134 120 C141 100 164 104 166 138 Z" fill={C.body} stroke={C.line} strokeWidth="2.2" strokeLinejoin="round" />
      <g className="camel-breathe" style={{ transformOrigin: "112px 204px", transformBox: "view-box" }}>
        <ellipse cx="112" cy="168" rx="56" ry="38" fill={C.body} stroke={C.line} strokeWidth="2.2" />
        <ellipse cx="100" cy="178" rx="32" ry="22" fill={C.light} />
      </g>

      {/* ножки */}
      <ellipse cx="152" cy="200" rx="17" ry="9" fill={C.shade} stroke={C.line} strokeWidth="2" />
      {[78, 118].map((x) => (
        <g key={x}>
          <ellipse cx={x} cy="203" rx="15.5" ry="8.5" fill={C.body} stroke={C.line} strokeWidth="2" />
          <path d={`M${x - 13} 205 a13 6 0 0 0 26 0 Z`} fill={C.hoof} />
          <path d={`M${x} 203 v7`} stroke={C.light} strokeWidth="1.6" />
        </g>
      ))}

      {/* шея */}
      <path d="M70 152 C64 132 66 112 72 98 L102 98 C107 114 107 134 104 152 Z" fill={C.body} stroke={C.line} strokeWidth="2.2" strokeLinejoin="round" />

      {!propInFront && <Prop pose={pose} />}

      {/* шарфик с орнаментом */}
      <path d="M62 112 C76 124 98 124 112 112 L114 126 C98 138 76 138 60 126 Z" fill={C.scarf} stroke={C.scarfDark} strokeWidth="2" strokeLinejoin="round" />
      <path d="M68 121 l5 -3 l5 3 l5 -3 l5 3 l5 -3 l5 3 l5 -3 l5 3" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.9" />
      <g className="camel-scarf" style={{ transformOrigin: "92px 128px", transformBox: "view-box" }}>
        <path d="M86 128 L100 128 L106 164 L90 166 Z" fill={C.scarf} stroke={C.scarfDark} strokeWidth="2" strokeLinejoin="round" />
        <path d="M97 138 l5 6 l-5 6 l-5 -6 Z M97 152 l3.5 4 l-3.5 4 l-3.5 -4 Z" fill="#fff" opacity="0.9" />
        <path d="M91 166 l-1 5 M95 166 l-0.5 5 M99 165.5 l0 5 M103 165 l0.5 5" stroke={C.scarfDark} strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* лапки */}
      <ArmShape shoulder={SHOULDER_L} arm={p.l} id="l" />
      <ArmShape shoulder={SHOULDER_R} arm={p.r} id="r" />

      {propInFront && <Prop pose={pose} />}

      {/* голова */}
      <g className="camel-head" style={{ transformOrigin: "88px 104px", transformBox: "view-box" }}>
        <g transform="rotate(-28 50 58)">
          <ellipse cx="50" cy="58" rx="14" ry="7.5" fill={C.body} stroke={C.line} strokeWidth="2.2" />
          <ellipse cx="48" cy="58" rx="8" ry="3.6" fill="#F5B7A0" />
        </g>
        <g transform="rotate(28 124 58)">
          <ellipse cx="124" cy="58" rx="14" ry="7.5" fill={C.body} stroke={C.line} strokeWidth="2.2" />
          <ellipse cx="126" cy="58" rx="8" ry="3.6" fill="#F5B7A0" />
        </g>
        <ellipse cx="87" cy="72" rx="37" ry="32" fill={C.body} stroke={C.line} strokeWidth="2.2" />
        {/* чубчик */}
        <circle cx="76" cy="43" r="8" fill={C.shade} />
        <circle cx="87" cy="39" r="9" fill={C.shade} />
        <circle cx="98" cy="43" r="8" fill={C.shade} />
        <Eyes gaze={p.gaze} />
        <ellipse cx="60" cy="84" rx="7.5" ry="4.6" fill={C.blush} opacity="0.55" />
        <ellipse cx="114" cy="84" rx="7.5" ry="4.6" fill={C.blush} opacity="0.55" />
        {/* мордочка */}
        <ellipse cx="87" cy="92" rx="25" ry="15.5" fill={C.light} stroke={C.line} strokeWidth="2" />
        <ellipse cx="79" cy="88" rx="2.8" ry="2" fill={C.line} />
        <ellipse cx="95" cy="88" rx="2.8" ry="2" fill={C.line} />
        <path d="M76 96 Q87 106 98 96" stroke={C.ink} strokeWidth="2.6" fill="none" strokeLinecap="round" />
        <path d="M83 100.5 Q87 104 91 100.5" fill="#F08C7A" />
      </g>
    </svg>
  );
}
