"use client";

import { Camera, Heart, MessagesSquare, BookOpen, Sprout } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { ImageAsset } from "@/lib/media";
import { Mascot } from "@/components/mascot/Mascot";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ShapeBg, type ShapeName } from "@/components/decor/shapes";
import { Butterfly, Cloud, Flower, Ornament, Sparkle, Star } from "@/components/decor/Decor";

type StatKey = "places" | "groups" | "meals" | "lang" | "hours" | "type";

const STAT_STYLE: Record<StatKey, { shape: ShapeName; fill: string; accent: string; offset: string }> = {
  places: { shape: "flower", fill: "#FDE7B8", accent: "#B8770F", offset: "lg:translate-y-0" },
  groups: { shape: "cloud", fill: "#D8F0FC", accent: "#2C7FA8", offset: "lg:translate-y-[clamp(10px,2.4vh,22px)]" },
  meals: { shape: "blobA", fill: "#FBDCC6", accent: "#B85A22", offset: "lg:-translate-y-1" },
  lang: { shape: "blobC", fill: "#CDEEEE", accent: "#23807F", offset: "lg:translate-y-1" },
  hours: { shape: "wavyCard", fill: "#D9EFD6", accent: "#3F8A3A", offset: "lg:translate-y-[clamp(10px,2.4vh,22px)]" },
  type: { shape: "blobB", fill: "#FFE9C9", accent: "#B85A22", offset: "lg:translate-y-0" },
};

const ORDER: StatKey[] = ["places", "groups", "meals", "lang", "hours", "type"];

export function About({ photo }: { photo: ImageAsset | null }) {
  const { t } = useI18n();
  const values = [
    { icon: Heart, text: t.about.values.care, color: "#E99560" },
    { icon: MessagesSquare, text: t.about.values.talk, color: "#67C8C7" },
    { icon: BookOpen, text: t.about.values.learn, color: "#F5B041" },
    { icon: Sprout, text: t.about.values.grow, color: "#8CCB87" },
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="section-zh overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="clip-blob-c absolute -left-24 top-10 h-64 w-64 bg-sun-soft opacity-70 lg:h-80 lg:w-80" />
        <div className="clip-blob-a absolute -right-20 bottom-6 h-56 w-56 bg-teal-soft opacity-60" />
        <Cloud className="absolute right-[6%] top-[5%] w-20 animate-drift lg:w-24" color="#fbdcc6" shade="#f6c6a4" />
        <Star className="absolute left-[46%] top-[7%] w-5 animate-twinkle" color="#91d5f5" />
        <Sparkle className="absolute bottom-[8%] left-[38%] w-4 animate-twinkle [animation-delay:1.5s]" color="#f5b041" />
      </div>

      <div className="container-zh grid items-center gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
        {/* Мобильный заголовок */}
        <div className="lg:hidden">
          <SectionTitle kicker={t.about.kicker} title={t.about.title} id="about-title" />
        </div>

        {/* Фото в «цветочной» рамке + маскот */}
        <Reveal className="relative mx-auto w-full max-w-[340px] lg:max-w-[min(100%,58vh)]">
          <div className="relative aspect-[0.92/1]">
            <div className="clip-drop absolute -left-[6%] -top-[4%] h-[104%] w-[96%] rotate-[-8deg] bg-peach-soft" aria-hidden="true" />
            <div className="clip-arch absolute inset-[4%] overflow-hidden bg-cream shadow-xl">
              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photo.src} width={photo.width} height={photo.height} alt={t.about.photoAlt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_30%_25%,#fff_0,#fff4dc_55%,#fde7b8_100%)] px-8 text-center">
                  <span className="clip-flower flex h-16 w-16 items-center justify-center bg-sun">
                    <Camera className="h-7 w-7 text-ink" aria-hidden="true" />
                  </span>
                  <p className="text-[0.95rem] font-extrabold text-ink-soft">{t.about.photoSoon}</p>
                  <Ornament className="w-14 opacity-70" color="#e99560" />
                </div>
              )}
            </div>
            <div className="pointer-events-none absolute inset-[4%] clip-arch shadow-[inset_0_0_0_6px_rgba(255,255,255,0.7)]" aria-hidden="true" />
            <Flower className="absolute -right-[2%] top-[6%] w-[14%] animate-sway" petal="#67c8c7" />
            <Butterfly className="absolute -left-[4%] top-[34%] w-[12%] animate-bob" a="#f5b041" b="#8ccb87" />
          </div>
          <Mascot
            slot="about"
            alt={t.about.mascotAlt}
            className="absolute -bottom-[8%] -right-[10%] w-[40%] max-w-[150px] lg:-right-[16%] lg:w-[clamp(100px,21vh,170px)] lg:max-w-none"
          />
        </Reveal>

        <div>
          <div className="hidden lg:block">
            <SectionTitle kicker={t.about.kicker} title={t.about.title} />
          </div>
          <Reveal delay={0.05}>
            <p className="lead-zh mt-1 lg:mt-[clamp(10px,2vh,18px)]">{t.about.lead}</p>
            <p className="mt-2 text-[0.98rem] font-bold leading-relaxed text-teal-deep lg:text-[clamp(0.92rem,min(1vw,2.1vh),1.05rem)]">{t.about.text}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-4 flex flex-wrap gap-2 lg:mt-[clamp(10px,2vh,18px)]">
              {values.map(({ icon: Icon, text, color }) => (
                <li key={text} className="inline-flex items-center gap-2 rounded-full bg-cream py-1 pl-1 pr-3.5 text-[0.9rem] font-extrabold text-ink">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full" style={{ background: color }}>
                    <Icon className="h-3.5 w-3.5 text-ink" aria-hidden="true" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Показатели — облака, цветочки и пятна */}
          <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3 lg:mt-[clamp(14px,3vh,30px)] lg:gap-x-4 lg:gap-y-[clamp(8px,1.6vh,16px)]">
            {ORDER.map((key, i) => {
              const s = STAT_STYLE[key];
              const stat = t.about.stats[key];
              const long = stat.value.length > 5;
              return (
                <Reveal
                  as="li"
                  key={key}
                  delay={0.05 * i}
                  className={`relative isolate flex flex-col items-center justify-center px-4 text-center ${s.offset} ${
                    i % 2 === 1 ? "translate-y-3 sm:translate-y-0" : ""
                  } h-[128px] lg:h-[clamp(100px,17vh,146px)]`}
                >
                  <ShapeBg shape={s.shape} fill={s.fill} />
                  <span
                    className={`h-display leading-none ${long ? "text-[1.12rem] lg:text-[clamp(1rem,min(1.35vw,2.6vh),1.3rem)]" : "text-[2.1rem] lg:text-[clamp(1.8rem,min(2.6vw,5vh),2.6rem)]"}`}
                    style={{ color: s.accent }}
                  >
                    {stat.value}
                  </span>
                  <span className="mt-1 text-[0.92rem] font-black leading-tight text-ink">{stat.label}</span>
                  <span className="mt-0.5 text-[0.74rem] font-bold leading-tight text-ink-soft">{stat.hint}</span>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
