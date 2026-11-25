"use client";

import { motion } from "framer-motion";
import { Info, UtensilsCrossed } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Mascot } from "@/components/mascot/Mascot";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Cloud, FoodBerries, FoodFruits, FoodMilk, FoodPorridge, FoodVegetables, Sparkle, Star } from "@/components/decor/Decor";

const PLATES = [
  { key: "fruits", Food: FoodFruits, rim: "#F5B041", bg: "#FFF6DF" },
  { key: "vegetables", Food: FoodVegetables, rim: "#8CCB87", bg: "#EEF8EC" },
  { key: "milk", Food: FoodMilk, rim: "#91D5F5", bg: "#EEF8FE" },
  { key: "porridge", Food: FoodPorridge, rim: "#67C8C7", bg: "#E9F7F7" },
  { key: "berries", Food: FoodBerries, rim: "#E99560", bg: "#FDEEE4" },
] as const;

function Plate({ i, size = "md" }: { i: number; size?: "sm" | "md" }) {
  const { t } = useI18n();
  const p = PLATES[i];
  const label = t.nutrition.food[p.key];
  return (
    <figure className="flex flex-col items-center">
      <div
        role="img"
        aria-label={label}
        className={`relative flex items-center justify-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-rotate-6 hover:scale-110 ${
          size === "sm" ? "h-[86px] w-[86px]" : "h-[clamp(74px,13vh,108px)] w-[clamp(74px,13vh,108px)]"
        }`}
        style={{ background: p.bg, boxShadow: `inset 0 0 0 5px ${p.rim}, inset 0 0 0 10px #fff, 0 10px 18px -10px rgba(52,69,74,0.45)` }}
      >
        <p.Food className="h-[66%] w-[66%]" />
        <span
          className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full text-[0.85rem] font-black text-ink shadow"
          style={{ background: p.rim }}
          aria-hidden="true"
        >
          {i + 1}
        </span>
      </div>
      <figcaption className="mt-1.5 whitespace-nowrap text-[0.82rem] font-extrabold text-ink">
        {t.nutrition.meals[i]} {t.nutrition.mealWord}
      </figcaption>
    </figure>
  );
}

export function Nutrition() {
  const { t } = useI18n();
  // Пять тарелок по кругу вокруг верблюжонка (углы в градусах).
  const angles = [-90, -18, 54, 126, 198];

  return (
    <section id="nutrition" aria-labelledby="nutrition-title" className="section-zh overflow-hidden bg-[linear-gradient(160deg,#fff_0%,#fff7e6_55%,#fdeee4_100%)]">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="clip-blob-b absolute -right-28 -top-16 h-72 w-72 bg-peach-soft opacity-60" />
        <div className="clip-cloud absolute -left-16 bottom-0 h-40 w-64 bg-leaf-soft opacity-70" />
        <Cloud className="absolute left-[40%] top-[6%] w-20 animate-drift" color="#d8f0fc" shade="#c4e7f8" />
        <Star className="absolute bottom-[14%] left-[42%] w-5 animate-twinkle" />
        <Sparkle className="absolute right-[4%] top-[40%] w-4 animate-twinkle [animation-delay:1.4s]" color="#e99560" />
      </div>

      <div className="container-zh grid items-center gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
        <div>
          <SectionTitle kicker={t.nutrition.kicker} title={t.nutrition.title} color="#b85a22" wave="#e99560" id="nutrition-title" />
          <Reveal delay={0.05}>
            <p className="lead-zh mt-3 max-w-xl">{t.nutrition.lead}</p>
          </Reveal>
          <Reveal delay={0.1} className="mt-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-[22px_30px_24px_28px] bg-peach px-4 py-2.5 text-[1rem] font-black text-ink">
              <UtensilsCrossed className="h-5 w-5" aria-hidden="true" />
              {t.nutrition.chip}
            </span>
            <span className="flex items-center gap-1" aria-hidden="true">
              {PLATES.map((p) => (
                <span key={p.key} className="h-3 w-3 rounded-full" style={{ background: p.rim }} />
              ))}
            </span>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-5 flex max-w-md items-start gap-2 text-[0.9rem] font-bold leading-relaxed text-ink-soft">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-peach-deep" aria-hidden="true" />
              {t.nutrition.note}
            </p>
          </Reveal>
        </div>

        {/* Десктоп: пять тарелок по кругу */}
        <div className="relative mx-auto hidden aspect-square w-[min(100%,62vh,500px)] lg:block">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <circle cx="50" cy="50" r="38" fill="none" stroke="#e99560" strokeOpacity="0.45" strokeWidth="0.6" strokeDasharray="1.6 2.2" />
            <circle cx="50" cy="50" r="25" fill="#fde7b8" opacity="0.65" />
          </svg>
          <Mascot slot="nutrition" alt={t.nutrition.mascotAlt} className="absolute left-1/2 top-1/2 w-[40%] -translate-x-1/2 -translate-y-[54%]" />
          <ul>
            {angles.map((a, i) => {
              const rad = (a * Math.PI) / 180;
              return (
                <motion.li
                  key={i}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${50 + 38 * Math.cos(rad)}%`, top: `${50 + 38 * Math.sin(rad)}%` }}
                  initial={{ opacity: 0, scale: 0.4 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.25 + i * 0.1 }}
                >
                  <Plate i={i} />
                </motion.li>
              );
            })}
          </ul>
        </div>

        {/* Мобильная версия: маскот и волнистая «гирлянда» тарелок */}
        <div className="lg:hidden">
          <Mascot slot="nutrition" alt={t.nutrition.mascotAlt} className="mx-auto w-[150px]" />
          <ul className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-3">
            {PLATES.map((p, i) => (
              <Reveal as="li" key={p.key} delay={0.06 * i} className={i % 2 ? "translate-y-4" : ""}>
                <Plate i={i} size="sm" />
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
