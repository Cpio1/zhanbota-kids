"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { scrollToSection, useUi } from "@/lib/ui";
import { LANGS, SITE, type Lang } from "@/lib/site";
import type { SectionId } from "@/locales/dictionary";
import { LogoMark } from "./ui/LogoMark";
import { WhatsAppIcon } from "./ui/BrandIcons";
import { Cloud, Star } from "./decor/Decor";

export const NAV_IDS: SectionId[] = ["about", "groups", "nutrition", "gallery", "documents", "contacts"];

const NAV_COLORS: Record<SectionId, string> = {
  about: "#F5B041",
  groups: "#67C8C7",
  nutrition: "#E99560",
  gallery: "#91D5F5",
  documents: "#8CCB87",
  contacts: "#F5B041",
};

/** Активный раздел по положению прокрутки (раздел, верх которого прошёл линию под шапкой). */
function useActiveSection(headerH: number) {
  const [active, setActive] = useState<SectionId | null>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = headerH + window.innerHeight * 0.3;
      let current: SectionId | null = null;
      for (const id of NAV_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = "contacts";
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [headerH]);
  return active;
}

export function LangSwitch({ compact = false }: { compact?: boolean }) {
  const { lang, setLang, t } = useI18n();
  return (
    <div role="group" aria-label={t.header.lang} className="relative flex items-center rounded-full bg-white/90 p-1 shadow-[inset_0_0_0_2px_#fde7b8]">
      {LANGS.map((l: Lang) => {
        const on = l === lang;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={on}
            lang={l}
            className={`relative z-10 rounded-full font-extrabold transition-colors ${compact ? "h-8 w-10 text-[0.8rem]" : "h-9 w-11 text-sm"} ${on ? "text-ink" : "text-ink-soft hover:text-ink"}`}
          >
            {on && (
              <motion.span
                layoutId={`lang-knob-${compact ? "m" : "d"}`}
                className="absolute inset-0 -z-10 rounded-full bg-sun"
                transition={{ type: "spring", stiffness: 500, damping: 32 }}
              />
            )}
            {l === "kk" ? "KZ" : "RU"}
          </button>
        );
      })}
    </div>
  );
}

export function Header() {
  const { t } = useI18n();
  const { menuOpen, setMenuOpen } = useUi();
  const ref = useRef<HTMLElement>(null);
  const [headerH, setHeaderH] = useState(64);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(headerH);

  // Реальная высота шапки → CSS-переменная --header-h (используется scroll-padding-top и высотой секций).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const apply = () => {
      const h = Math.round(el.getBoundingClientRect().height);
      setHeaderH(h);
      document.documentElement.style.setProperty("--header-h", `${h}px`);
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Блокировка прокрутки и закрытие по Escape при открытом мобильном меню.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setMenuOpen(false);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [menuOpen, setMenuOpen]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    // Ждём закрытия меню (снятие блокировки прокрутки), затем прокручиваем.
    requestAnimationFrame(() => scrollToSection(id));
  };

  return (
    <>
      <header
        ref={ref}
        className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
          scrolled || menuOpen ? "bg-cream/95 shadow-[0_6px_24px_-12px_rgba(52,69,74,0.35)] backdrop-blur-md" : "bg-cream/80 backdrop-blur-sm"
        }`}
      >
        <div className="container-zh flex h-[60px] items-center justify-between gap-3 lg:h-[68px]">
          <a href="#top" onClick={go("top")} aria-label={t.header.home} className="group flex shrink-0 items-center gap-2.5">
            <span className="transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-[-8deg] group-hover:scale-110">
              <LogoMark className="h-10 w-10 lg:h-11 lg:w-11" />
            </span>
            <span className="leading-none">
              <span className="block text-[1.32rem] font-black tracking-tight text-ink lg:text-[1.45rem]">{SITE.name}</span>
              <span className="mt-0.5 block text-[0.72rem] font-bold uppercase tracking-[0.12em] text-teal-deep">{t.header.kind}</span>
            </span>
          </a>

          <nav aria-label={t.header.navLabel} className="hidden lg:block">
            <ul className="flex items-center gap-0.5 xl:gap-1">
              {NAV_IDS.map((id) => {
                const on = active === id;
                return (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={go(id)}
                      aria-current={on ? "true" : undefined}
                      className={`relative block rounded-full px-3 py-2 text-[0.95rem] font-extrabold transition-colors xl:px-4 ${on ? "text-ink" : "text-ink-soft hover:text-ink"}`}
                    >
                      {on && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 -z-10 rounded-[46%_54%_52%_48%/58%_46%_54%_42%]"
                          style={{ background: NAV_COLORS[id] }}
                          transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        />
                      )}
                      {t.nav[id]}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={SITE.phoneHref}
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-[0.95rem] font-extrabold text-ink transition-colors hover:bg-white/70 xl:flex"
            >
              <Phone className="h-4 w-4 text-teal-deep" aria-hidden="true" />
              {SITE.phone}
            </a>
            <div className="hidden lg:block">
              <LangSwitch />
            </div>
            <div className="lg:hidden">
              <LangSwitch compact />
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? t.header.close : t.header.menu}
              className="relative flex h-11 w-11 items-center justify-center rounded-[48%_52%_44%_56%/56%_44%_56%_44%] bg-teal text-ink transition-transform active:scale-90 lg:hidden"
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.span
                  key={menuOpen ? "x" : "m"}
                  initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {menuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t.header.navLabel}
            className="fixed inset-x-0 bottom-0 z-40 overflow-y-auto overscroll-contain bg-cream lg:hidden"
            style={{ top: "var(--header-h)" }}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
              <Cloud className="absolute -left-6 top-8 w-28 opacity-90" color="#d8f0fc" shade="#c5e8fa" />
              <Cloud className="absolute -right-8 bottom-28 w-32" color="#fde7b8" shade="#fbd890" />
              <Star className="absolute right-10 top-10 w-6 animate-twinkle" />
              <Star className="absolute bottom-16 left-10 w-5 animate-twinkle" color="#67c8c7" />
            </div>
            <nav aria-label={t.header.navLabel} className="relative px-5 pb-10 pt-6">
              <ul className="grid gap-2.5">
                {NAV_IDS.map((id, i) => (
                  <motion.li
                    key={id}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i + 0.05, duration: 0.3 }}
                  >
                    <a
                      href={`#${id}`}
                      onClick={go(id)}
                      aria-current={active === id ? "true" : undefined}
                      className="flex min-h-[54px] items-center gap-3 rounded-[28px_40px_32px_44px] bg-white/80 px-5 text-[1.15rem] font-black text-ink shadow-[0_4px_0_rgba(52,69,74,0.06)] active:scale-[0.98]"
                    >
                      <span className="h-3.5 w-3.5 shrink-0 rounded-full" style={{ background: NAV_COLORS[id] }} aria-hidden="true" />
                      {t.nav[id]}
                      {active === id && <span className="ml-auto h-2 w-2 rounded-full bg-ink" aria-hidden="true" />}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                <a href={SITE.phoneHref} className="btn-zh bg-sun text-ink">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  {SITE.phone}
                </a>
                <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-zh bg-wa text-white">
                  <WhatsAppIcon className="h-5 w-5" />
                  {t.hero.whatsapp}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
