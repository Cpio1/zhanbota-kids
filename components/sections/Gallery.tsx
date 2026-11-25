"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Camera, ChevronLeft, ChevronRight, Expand, Heart, Star as StarIcon, X } from "lucide-react";
import { fill, useI18n } from "@/lib/i18n";
import { useUi } from "@/lib/ui";
import { SITE } from "@/lib/site";
import type { ImageAsset } from "@/lib/media";
import { Mascot } from "@/components/mascot/Mascot";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import { Cloud, Flower, Sparkle, Star } from "@/components/decor/Decor";

/** Чередующиеся креативные рамки фотографий. */
const FRAMES = ["clip-blob-a", "clip-arch", "clip-blob-c", "clip-cloud", "clip-blob-b", "clip-flower", "clip-drop", "clip-wavy"];
const FRAME_BG = ["#FDE7B8", "#CDEEEE", "#FBDCC6", "#D8F0FC", "#D9EFD6", "#FDE7B8", "#CDEEEE", "#FBDCC6"];

function usePerPage() {
  const [perPage, setPerPage] = useState(8);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sm = window.matchMedia("(min-width: 640px)");
    const apply = () => setPerPage(mq.matches ? 8 : sm.matches ? 6 : 6);
    apply();
    mq.addEventListener("change", apply);
    sm.addEventListener("change", apply);
    return () => {
      mq.removeEventListener("change", apply);
      sm.removeEventListener("change", apply);
    };
  }, []);
  return perPage;
}

function Lightbox({ photos, index, onClose, onIndex }: { photos: ImageAsset[]; index: number; onClose: () => void; onIndex: (i: number) => void }) {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const touch = useRef<number | null>(null);
  const [dir, setDir] = useState(0);
  const n = photos.length;
  const go = useCallback(
    (d: number) => {
      setDir(d);
      onIndex((index + d + n) % n);
    },
    [index, n, onIndex],
  );

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  const photo = photos[index];
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={fill(t.gallery.photoAlt, { n: index + 1 })}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[#1f2b2e]/92 p-3 backdrop-blur-sm sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touch.current = null;
      }}
    >
      <AnimatePresence mode="popLayout" initial={false} custom={dir}>
        <motion.img
          key={photo.src}
          src={photo.src}
          width={photo.width}
          height={photo.height}
          alt={fill(t.gallery.photoAlt, { n: index + 1 })}
          className="max-h-[calc(100svh-120px)] max-w-full rounded-[28px] object-contain shadow-2xl sm:max-h-[calc(100svh-96px)]"
          onClick={(e) => e.stopPropagation()}
          initial={reduce ? false : { opacity: 0, x: dir * 60, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -60, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      </AnimatePresence>

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label={t.gallery.close}
        className="absolute right-3 top-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink transition-transform hover:rotate-90 sm:right-5 sm:top-5"
      >
        <X className="h-6 w-6" aria-hidden="true" />
      </button>
      {n > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            aria-label={t.gallery.prev}
            className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-full bg-sun text-ink transition-transform hover:scale-110 sm:bottom-auto sm:left-5 sm:top-1/2 sm:-translate-y-1/2"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            aria-label={t.gallery.next}
            className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-sun text-ink transition-transform hover:scale-110 sm:bottom-auto sm:right-5 sm:top-1/2 sm:-translate-y-1/2"
          >
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-3 py-1 text-sm font-extrabold text-ink" aria-live="polite">
            {index + 1} / {n}
          </p>
        </>
      )}
    </motion.div>
  );
}

function EmptyGallery() {
  const { t } = useI18n();
  const icons = [Camera, Heart, StarIcon, Camera, Heart, StarIcon];
  return (
    <div className="relative mt-6 lg:mt-[clamp(16px,3.4vh,32px)]">
      <ul className="grid grid-cols-3 gap-3 sm:gap-4 lg:grid-cols-6 lg:gap-5" aria-hidden="true">
        {icons.map((Icon, i) => (
          <li
            key={i}
            className={`${FRAMES[i]} flex aspect-square items-center justify-center ${i % 2 ? "translate-y-3" : ""}`}
            style={{ background: FRAME_BG[i] }}
          >
            <Icon className="h-7 w-7 text-ink/25 lg:h-9 lg:w-9" />
          </li>
        ))}
      </ul>
      <div className="relative mx-auto max-w-xl px-4 pt-6 text-center lg:pt-[clamp(14px,3vh,28px)]">
        <p className="text-[1.2rem] font-black text-ink lg:text-[1.35rem]">{t.gallery.emptyTitle}</p>
        <p className="lead-zh mt-1.5">{t.gallery.emptyText}</p>
        <a
          href={SITE.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-zh mt-4 bg-[linear-gradient(135deg,#f5b041,#e99560_55%,#d96b8a)] text-white shadow-[0_10px_22px_-12px_rgba(217,107,138,0.9)]"
        >
          <InstagramIcon className="h-5 w-5" />
          {t.gallery.emptyCta}
        </a>
      </div>
    </div>
  );
}

export function Gallery({ photos }: { photos: ImageAsset[] }) {
  const { t } = useI18n();
  const { setLightboxOpen } = useUi();
  const perPage = usePerPage();
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const pages = Math.max(1, Math.ceil(photos.length / perPage));
  const current = Math.min(page, pages - 1);
  const slice = useMemo(() => photos.slice(current * perPage, current * perPage + perPage), [photos, current, perPage]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => setLightboxOpen(open !== null), [open, setLightboxOpen]);

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="section-zh overflow-hidden bg-sky-soft/60">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <Cloud className="absolute left-[30%] top-[4%] w-20 animate-drift" />
        <Cloud className="absolute bottom-[4%] right-[6%] w-24 animate-drift-slow" color="#fff4dc" shade="#fbe6b9" />
        <Flower className="absolute bottom-[8%] left-[3%] w-8 animate-sway" petal="#f5b041" center="#e99560" />
        <Star className="absolute right-[24%] top-[8%] w-5 animate-twinkle" />
        <Sparkle className="absolute left-[4%] top-[30%] w-4 animate-twinkle [animation-delay:2s]" color="#e99560" />
      </div>

      <div className="container-zh">
        <div className="flex items-end justify-between gap-4">
          <div>
            <SectionTitle kicker={t.gallery.kicker} title={t.gallery.title} color="#2c7fa8" wave="#91d5f5" id="gallery-title" />
            <Reveal delay={0.05}>
              <p className="lead-zh mt-2">{t.gallery.lead}</p>
            </Reveal>
          </div>
          <Mascot slot="gallery" alt={t.gallery.mascotAlt} className="w-[92px] shrink-0 sm:w-[110px] lg:w-[clamp(96px,17vh,150px)]" />
        </div>

        {photos.length === 0 ? (
          <EmptyGallery />
        ) : (
          <>
            <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:mt-[clamp(14px,3vh,28px)] lg:grid-cols-4 lg:gap-[clamp(10px,2vh,20px)]">
              {slice.map((p, i) => {
                const n = current * perPage + i;
                return (
                  <Reveal as="li" key={p.src} delay={0.04 * i} y={14}>
                    <button
                      type="button"
                      onClick={() => setOpen(n)}
                      aria-label={`${t.gallery.open}: ${fill(t.gallery.photoAlt, { n: n + 1 })}`}
                      className="group relative block aspect-[4/3.3] w-full lg:aspect-auto lg:h-[clamp(130px,25vh,250px)]"
                    >
                      <span className={`${FRAMES[n % FRAMES.length]} absolute inset-0 translate-x-1.5 translate-y-2`} style={{ background: FRAME_BG[n % FRAME_BG.length] }} aria-hidden="true" />
                      <span className={`${FRAMES[n % FRAMES.length]} absolute inset-0 overflow-hidden bg-white`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.src}
                          width={p.width}
                          height={p.height}
                          alt={fill(t.gallery.photoAlt, { n: n + 1 })}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                      </span>
                      <span className="absolute bottom-[12%] right-[12%] flex h-9 w-9 scale-75 items-center justify-center rounded-full bg-white/95 text-ink opacity-0 shadow transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100" aria-hidden="true">
                        <Expand className="h-4 w-4" />
                      </span>
                    </button>
                  </Reveal>
                );
              })}
            </ul>

            {pages > 1 && (
              <nav aria-label={t.gallery.page} className="mt-5 flex items-center justify-center gap-3 lg:mt-[clamp(12px,2.6vh,24px)]">
                <button
                  type="button"
                  onClick={() => setPage((current - 1 + pages) % pages)}
                  aria-label={t.gallery.prev}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow transition-transform hover:scale-110"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <ul className="flex items-center gap-2">
                  {Array.from({ length: pages }, (_, i) => (
                    <li key={i}>
                      <button
                        type="button"
                        onClick={() => setPage(i)}
                        aria-label={`${t.gallery.page} ${i + 1}`}
                        aria-current={i === current ? "page" : undefined}
                        className={`h-3 rounded-full transition-all ${i === current ? "w-8 bg-sun" : "w-3 bg-white hover:bg-sun-soft"}`}
                      />
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => setPage((current + 1) % pages)}
                  aria-label={t.gallery.next}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow transition-transform hover:scale-110"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
                <span className="ml-1 text-sm font-extrabold text-ink-soft" aria-live="polite">
                  {current + 1} {t.gallery.of} {pages}
                </span>
              </nav>
            )}
          </>
        )}
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>{open !== null && <Lightbox photos={photos} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />}</AnimatePresence>,
          document.body,
        )}
    </section>
  );
}
