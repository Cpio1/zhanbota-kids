"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useUi } from "@/lib/ui";
import { SITE } from "@/lib/site";
import { WhatsAppIcon } from "./ui/BrandIcons";

/**
 * Плавающая кнопка WhatsApp.
 * Не перекрывает контент: на десктопе живёт в боковом поле контейнера; скрывается на первом экране
 * (там есть своя кнопка), в разделе «Контакты» (карта и кнопки связи), в футере, при открытом меню и lightbox.
 */
export function WhatsAppFloat() {
  const { t } = useI18n();
  const { menuOpen, lightboxOpen } = useUi();
  const reduce = useReducedMotion();
  const [blocked, setBlocked] = useState<Record<string, boolean>>({ top: true });
  const [bubble, setBubble] = useState(false);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);

  useEffect(() => {
    const ids = ["top", "contacts", "site-footer"];
    const els = ids.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        setBlocked((prev) => {
          const next = { ...prev };
          for (const e of entries) next[e.target.id] = e.target.id === "top" ? e.intersectionRatio > 0.35 : e.isIntersecting;
          return next;
        });
      },
      { threshold: [0, 0.35, 0.6], rootMargin: "0px 0px -80px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const hidden = menuOpen || lightboxOpen || Object.values(blocked).some(Boolean);

  // Облачко-подсказка: появляется один раз ненадолго после первого показа кнопки.
  useEffect(() => {
    if (hidden || bubbleDismissed) return;
    const show = setTimeout(() => setBubble(true), 1600);
    const hide = setTimeout(() => {
      setBubble(false);
      setBubbleDismissed(true);
    }, 8000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [hidden, bubbleDismissed]);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          key="wa"
          className="fixed bottom-[calc(16px+env(safe-area-inset-bottom))] right-3 z-40 flex flex-col items-end sm:right-5 lg:bottom-6 lg:right-[18px]"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.6 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.6 }}
          transition={{ type: "spring", stiffness: 380, damping: 22 }}
        >
          <AnimatePresence>
            {bubble && (
              <motion.div
                className="relative mb-2.5 mr-1 flex max-w-[180px] items-start gap-1.5 rounded-[22px_22px_6px_22px] bg-white py-2 pl-3.5 pr-2 text-[0.84rem] font-extrabold leading-snug text-ink shadow-[0_10px_26px_-10px_rgba(52,69,74,0.5)]"
                initial={{ opacity: 0, y: 8, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.9 }}
                style={{ transformOrigin: "100% 100%" }}
              >
                <span>{t.whatsapp.bubble}</span>
                <button
                  type="button"
                  onClick={() => {
                    setBubble(false);
                    setBubbleDismissed(true);
                  }}
                  aria-label={t.whatsapp.hide}
                  className="-mr-0.5 -mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-ink-soft hover:bg-cream"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.whatsapp.label}
            onMouseEnter={() => !bubbleDismissed && setBubble(true)}
            className="group relative flex h-14 w-14 items-center justify-center lg:h-[58px] lg:w-[58px]"
          >
            <span className="absolute inset-0 rounded-full bg-wa" style={{ animation: "wa-pulse 2.6s ease-out 4" }} aria-hidden="true" />
            <span
              className="relative flex h-full w-full items-center justify-center rounded-[50%_50%_50%_14%] bg-wa text-white shadow-[0_12px_26px_-10px_rgba(31,168,85,0.95)] transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-1 group-hover:rotate-[-8deg] group-hover:scale-110 group-active:scale-95"
            >
              <WhatsAppIcon className="h-7 w-7 transition-transform duration-300 group-hover:rotate-[8deg]" />
            </span>
            <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-sun" aria-hidden="true" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
