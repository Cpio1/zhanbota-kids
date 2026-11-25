"use client";

import { ArrowUpRight, Languages, Users } from "lucide-react";
import { fill, useI18n } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { GROUPS, type GroupConfig } from "@/config/groups";
import { Mascot } from "@/components/mascot/Mascot";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ShapeBg, type ShapeName } from "@/components/decor/shapes";
import { Ball, BookIcon, Cloud, Cube, Pencil, Pyramid, Sparkle, Star, WaveEdge } from "@/components/decor/Decor";

const THEME: Record<GroupConfig["theme"], { shape: ShapeName; fill: string; stroke: string; badge: string; accent: string; offset: string }> = {
  yellow: { shape: "cloud", fill: "#FDE7B8", stroke: "#F5B041", badge: "#F5B041", accent: "#B8770F", offset: "lg:-translate-y-2" },
  teal: { shape: "blobB", fill: "#CDEEEE", stroke: "#67C8C7", badge: "#67C8C7", accent: "#23807F", offset: "lg:translate-y-[clamp(14px,3.4vh,34px)]" },
  green: { shape: "wavy", fill: "#D9EFD6", stroke: "#8CCB87", badge: "#8CCB87", accent: "#3F8A3A", offset: "lg:-translate-y-1" },
};

function Toys({ theme }: { theme: GroupConfig["theme"] }) {
  if (theme === "yellow")
    return (
      <div className="flex items-end gap-1" aria-hidden="true">
        <Cube className="w-9 animate-bob" color="#E99560" letter="Ә" />
        <Cube className="w-11" color="#67C8C7" letter="Б" />
        <Cube className="w-8 animate-bob [animation-delay:1s]" color="#8CCB87" letter="В" />
      </div>
    );
  if (theme === "teal")
    return (
      <div className="flex items-end gap-2" aria-hidden="true">
        <BookIcon className="w-14 animate-sway" color="#23807F" />
        <Pencil className="mb-1 w-12 -rotate-[24deg]" color="#F5B041" />
      </div>
    );
  return (
    <div className="flex items-end gap-2" aria-hidden="true">
      <Pyramid className="w-9" />
      <Ball className="w-10 animate-bob" />
    </div>
  );
}

function GroupShape({ g, index }: { g: GroupConfig; index: number }) {
  const { t, lang } = useI18n();
  const th = THEME[g.theme];
  const name = g.name[lang];
  const wa = `${SITE.whatsapp}?text=${encodeURIComponent(fill(t.groups.waText, { group: name }))}`;
  return (
    <Reveal
      as="li"
      delay={0.08 * index}
      className={`relative isolate flex flex-col px-[clamp(34px,11%,52px)] pb-10 pt-11 lg:h-[clamp(250px,43vh,350px)] lg:justify-center lg:pb-[clamp(24px,4.6vh,44px)] lg:pt-[clamp(28px,5vh,48px)] ${th.offset}`}
    >
      <ShapeBg shape={th.shape} fill={th.fill} stroke={th.stroke} strokeDash />
      <div className="flex items-start justify-between gap-3">
        <span className="clip-flower flex h-14 w-14 shrink-0 items-center justify-center text-[1.6rem] font-black text-ink lg:h-[clamp(48px,8vh,62px)] lg:w-[clamp(48px,8vh,62px)]" style={{ background: th.badge }}>
          {index + 1}
        </span>
        <Toys theme={g.theme} />
      </div>
      <h3 className="mt-3 text-[1.5rem] font-black leading-tight text-ink lg:text-[clamp(1.3rem,min(1.8vw,3.4vh),1.7rem)]">{name}</h3>
      <p className="mt-1.5 inline-flex items-center gap-1.5 text-[0.95rem] font-extrabold" style={{ color: th.accent }}>
        <Languages className="h-4 w-4" aria-hidden="true" />
        {t.groups.lang}
      </p>
      <p className="mt-1 text-[0.88rem] font-bold text-ink-soft">{g.age ? g.age[lang] : t.groups.ageHint}</p>
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[0.92rem] font-extrabold text-ink shadow-[0_6px_14px_-8px_rgba(52,69,74,0.5)] transition-transform hover:-translate-y-0.5 lg:mt-[clamp(8px,1.8vh,16px)]"
      >
        {t.groups.cta}
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
      </a>
    </Reveal>
  );
}

export function Groups() {
  const { t } = useI18n();
  return (
    <section id="groups" aria-labelledby="groups-title" className="section-zh overflow-hidden bg-cream">
      <WaveEdge className="absolute inset-x-0 top-0 -z-10" fill="#ffffff" flip />
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <Cloud className="absolute left-[3%] top-[12%] w-20 animate-drift lg:w-24" color="#ffffff" shade="#f3e6c8" />
        <Cloud className="absolute bottom-[6%] right-[42%] hidden w-20 animate-drift-slow lg:block" color="#d8f0fc" shade="#c4e7f8" />
        <Star className="absolute right-[30%] top-[10%] w-5 animate-twinkle" color="#e99560" />
        <Sparkle className="absolute bottom-[10%] left-[8%] w-4 animate-twinkle [animation-delay:1s]" color="#67c8c7" />
      </div>

      <div className="container-zh">
        <div className="flex items-end justify-between gap-4">
          <div className="max-w-2xl">
            <SectionTitle kicker={t.groups.kicker} title={t.groups.title} color="#23807f" wave="#67c8c7" id="groups-title" />
            <Reveal delay={0.05}>
              <p className="lead-zh mt-3">{t.groups.lead}</p>
            </Reveal>
          </div>
          <Mascot slot="groups" alt={t.groups.mascotAlt} className="w-[96px] shrink-0 sm:w-[120px] lg:w-[clamp(110px,20vh,170px)]" />
        </div>

        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:mt-[clamp(18px,4vh,40px)] lg:grid-cols-3 lg:gap-7">
          {GROUPS.map((g, i) => (
            <GroupShape key={g.id} g={g} index={i} />
          ))}
        </ul>

        <Reveal delay={0.1} className="mt-7 flex flex-wrap items-center gap-2 lg:mt-[clamp(18px,4.4vh,44px)]">
          <span className="inline-flex items-center gap-1.5 rounded-[20px_28px_22px_26px] bg-white px-4 py-2 text-[0.92rem] font-extrabold text-ink">
            <Users className="h-4 w-4 text-peach-deep" aria-hidden="true" />
            {t.groups.total}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-[28px_20px_26px_22px] bg-white px-4 py-2 text-[0.92rem] font-extrabold text-ink">
            <Languages className="h-4 w-4 text-teal-deep" aria-hidden="true" />
            {t.groups.lang}
          </span>
        </Reveal>
      </div>
    </section>
  );
}
