"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Clock, Languages, Users, Volume2, VolumeX } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { scrollToSection } from "@/lib/ui";
import { SITE } from "@/lib/site";
import type { ImageAsset, VideoAsset } from "@/lib/media";
import { Mascot } from "@/components/mascot/Mascot";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Balloon, Butterfly, Cloud, Flower, Mountains, Sparkle, Star, Sun, Yurt } from "@/components/decor/Decor";

/** Иллюстрация-заглушка вместо фото, пока main-page.png не добавлен (не выдаётся за фотографию). */
function HeroScene({ label }: { label: string }) {
  return (
    <div role="img" aria-label={label} className="relative h-full w-full overflow-hidden bg-gradient-to-b from-sky-soft via-[#eaf7fd] to-cream">
      <Cloud className="absolute left-[8%] top-[14%] w-[30%] animate-drift" />
      <Cloud className="absolute left-[48%] top-[30%] w-[20%] animate-drift-slow" color="#fff" shade="#d8f0fc" />
      <Mountains className="absolute inset-x-0 bottom-[16%] h-[42%] w-full" />
      <div className="absolute inset-x-0 bottom-0 h-[22%] bg-leaf" />
      <Yurt className="absolute bottom-[12%] left-[36%] w-[36%]" />
      <Yurt className="absolute bottom-[17%] left-[12%] w-[18%] opacity-90" />
      <Flower className="absolute bottom-[6%] left-[10%] w-[8%]" />
      <Flower className="absolute bottom-[8%] right-[14%] w-[7%]" petal="#91d5f5" />
      <Flower className="absolute bottom-[3%] right-[30%] w-[6%]" petal="#ffffff" />
    </div>
  );
}

function HeroMedia({ image, video }: { image: ImageAsset | null; video: VideoAsset | null }) {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  // Браузеры разрешают автозапуск только без звука — стартуем muted, звук включает пользователь.
  useEffect(() => {
    const v = ref.current;
    if (!v || reduce) return;
    v.muted = true;
    v.play().catch(() => {});
  }, [reduce]);

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    const next = !muted;
    v.muted = next;
    setMuted(next);
    if (v.paused || !next) v.play().catch(() => {});
  };

  return (
    <>
      <div className="clip-blob-b absolute inset-0 bg-sky-soft">
        {video ? (
          <video
            ref={ref}
            className="h-full w-full object-cover"
            muted
            loop
            playsInline
            autoPlay={!reduce}
            preload="metadata"
            poster={image?.src}
            aria-label={t.hero.videoLabel}
          >
            <source src={video.src} type={video.mime} />
          </video>
        ) : image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image.src}
            width={image.width}
            height={image.height}
            alt={t.hero.photoAlt}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <HeroScene label={t.hero.illustrationAlt} />
        )}
      </div>
      {video && (
        <button
          type="button"
          onClick={toggleSound}
          aria-pressed={!muted}
          aria-label={muted ? t.hero.soundOn : t.hero.soundOff}
          title={muted ? t.hero.soundOn : t.hero.soundOff}
          className="absolute bottom-[8%] right-[6%] z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink shadow-[0_8px_20px_-6px_rgba(52,69,74,0.45)] transition-transform hover:scale-110 active:scale-95"
        >
          {muted ? <VolumeX className="h-5 w-5" aria-hidden="true" /> : <Volume2 className="h-5 w-5 text-teal-deep" aria-hidden="true" />}
          {muted && <span className="absolute inset-0 animate-ping rounded-full bg-white/60 [animation-iteration-count:3]" aria-hidden="true" />}
        </button>
      )}
    </>
  );
}

export function Hero({ image, video }: { image: ImageAsset | null; video: VideoAsset | null }) {
  const { t } = useI18n();
  const ease = [0.22, 1, 0.36, 1] as const;
  const fade = (d: number) => ({ initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: d, ease } });

  const chips = [
    { icon: Clock, text: t.hero.chipHours, bg: "bg-sun-soft" },
    { icon: Languages, text: t.hero.chipLang, bg: "bg-teal-soft" },
    { icon: Users, text: t.hero.chipPlaces, bg: "bg-peach-soft" },
  ];

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="section-zh overflow-hidden bg-gradient-to-b from-cream via-[#fff8e8] to-[#fdf0d2] pb-[90px] lg:pb-[clamp(64px,11vh,104px)]"
    >
      {/* Фон: облака, звёздочки, горы */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <Cloud className="absolute right-[6%] top-[3%] w-16 animate-drift opacity-90 lg:left-[4%] lg:right-auto lg:top-[6%] lg:w-28" color="#d8f0fc" shade="#c4e7f8" />
        <Cloud className="absolute right-[38%] top-[3%] hidden w-24 animate-drift-slow lg:block" color="#fde7b8" shade="#fad990" />
        <Cloud className="absolute bottom-[26%] left-[44%] hidden w-16 animate-drift lg:block" color="#fbdcc6" shade="#f6c6a4" />
        <Star className="absolute left-[46%] top-[14%] w-5 animate-twinkle" />
        <Sparkle className="absolute left-[2%] top-[46%] w-4 animate-twinkle [animation-delay:1.2s]" />
        <Star className="absolute bottom-[30%] right-[3%] w-4 animate-twinkle [animation-delay:2s]" color="#67c8c7" />
        <Balloon className="absolute right-[2%] top-[12%] hidden w-7 animate-bob lg:block" color="#8ccb87" />
        <Mountains className="absolute inset-x-0 bottom-0 h-[70px] w-full opacity-80 lg:h-[clamp(60px,12vh,110px)]" />
      </div>

      <div className="container-zh relative grid items-center gap-x-10 gap-y-6 lg:grid-cols-[1.06fr_0.94fr] lg:grid-rows-[auto_auto] xl:gap-x-16">
        {/* Заголовок */}
        <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
          <motion.p {...fade(0)} className="inline-flex items-center gap-2 rounded-full bg-white/85 px-3.5 py-1.5 text-[0.8rem] font-extrabold text-teal-deep shadow-[inset_0_0_0_2px_#cdeeee]">
            <span className="h-2 w-2 rounded-full bg-leaf" aria-hidden="true" />
            {t.hero.badge}
          </motion.p>
          <motion.h1
            id="hero-title"
            {...fade(0.08)}
            className="h-display mt-3 text-balance text-ink text-[clamp(1.8rem,7.2vw,2.6rem)] lg:text-[clamp(2rem,min(3.3vw,6.3vh),3.45rem)]"
          >
            {t.hero.titleBefore}
            <span className="relative inline-block whitespace-nowrap text-peach-deep">
              {t.hero.titleName}
              <svg viewBox="0 0 120 12" className="absolute -bottom-1.5 left-0 h-2.5 w-full" aria-hidden="true" preserveAspectRatio="none">
                <path d="M3 8 C20 2 36 2 52 7 C68 12 86 11 117 4" stroke="#f5b041" strokeWidth="5" fill="none" strokeLinecap="round" />
              </svg>
            </span>
            {t.hero.titleAfter}
          </motion.h1>
          <motion.p {...fade(0.16)} className="mt-3 text-[1.08rem] font-extrabold leading-snug text-teal-deep lg:text-[clamp(1.05rem,min(1.45vw,2.8vh),1.35rem)]">
            {t.hero.subtitle}
          </motion.p>
        </div>

        {/* Фото / видео + маскот */}
        <motion.div
          className="relative mx-auto w-full max-w-[420px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:max-w-none"
          initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
        >
          <div className="relative mx-auto aspect-[1/0.92] w-[88%] lg:w-auto lg:h-[min(58vh,500px)] lg:max-w-full">
            {/* слои композиции */}
            <div className="clip-blob-a absolute -right-[5%] -top-[5%] h-[96%] w-[96%] bg-teal opacity-90" aria-hidden="true" />
            <div className="clip-flower absolute -bottom-[6%] -left-[4%] h-[38%] w-[38%] bg-sun" aria-hidden="true" />
            <HeroMedia image={image} video={video} />
            <Sun className="absolute -right-[8%] -top-[12%] w-[26%] max-w-[110px]" face={false} />
            <Butterfly className="absolute -top-[4%] left-[6%] w-[11%] animate-bob" />
            <Sparkle className="absolute -right-[4%] bottom-[24%] w-[6%] animate-twinkle" color="#e99560" />
          </div>
          <Mascot
            slot="hero"
            alt={t.hero.mascotAlt}
            delay={0.55}
            className="absolute -bottom-[4%] -left-[2%] z-10 w-[34%] max-w-[150px] lg:-bottom-[6%] lg:-left-[14%] lg:w-[clamp(110px,24vh,190px)] lg:max-w-none"
          />
        </motion.div>

        {/* Описание, кнопки, факты */}
        <div className="lg:col-start-1 lg:row-start-2 lg:self-start">
          <motion.p {...fade(0.24)} className="lead-zh max-w-[36rem]">
            {t.hero.description}
          </motion.p>
          <motion.div {...fade(0.32)} className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:mt-[clamp(14px,2.6vh,24px)]">
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-zh bg-wa text-white shadow-[0_10px_22px_-10px_rgba(31,168,85,0.9)]"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {t.hero.whatsapp}
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("about");
              }}
              className="btn-zh group bg-white text-ink shadow-[inset_0_0_0_2.5px_#f5b041]"
            >
              {t.hero.about}
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
            </a>
          </motion.div>
          <motion.ul {...fade(0.4)} className="mt-5 flex flex-wrap gap-2 lg:mt-[clamp(14px,2.6vh,24px)]">
            {chips.map(({ icon: Icon, text, bg }, i) => (
              <li
                key={text}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[0.86rem] font-extrabold text-ink ${bg} ${
                  ["rounded-[18px_26px_20px_28px]", "rounded-[26px_18px_28px_20px]", "rounded-[22px_28px_18px_24px]"][i]
                }`}
              >
                <Icon className="h-4 w-4 text-ink-soft" aria-hidden="true" />
                {text}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
