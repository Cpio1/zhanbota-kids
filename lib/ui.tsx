"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { MotionConfig } from "framer-motion";

/** Общее состояние интерфейса: открыто ли мобильное меню или lightbox (чтобы скрывать кнопку WhatsApp). */
interface UiValue {
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  lightboxOpen: boolean;
  setLightboxOpen: (v: boolean) => void;
}

const UiContext = createContext<UiValue | null>(null);

export function UiProvider({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const value = useMemo(() => ({ menuOpen, setMenuOpen, lightboxOpen, setLightboxOpen }), [menuOpen, lightboxOpen]);
  // reducedMotion="user": при «Уменьшить движение» Framer Motion отключает перемещения и масштаб, оставляя плавное появление.
  return (
    <UiContext.Provider value={value}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </UiContext.Provider>
  );
}

export function useUi(): UiValue {
  const ctx = useContext(UiContext);
  if (!ctx) throw new Error("useUi must be used inside UiProvider");
  return ctx;
}

/** Прокрутка к разделу ровно под шапкой (scroll-padding-top у html = реальная высота шапки). */
export function scrollToSection(id: string) {
  const el = id === "top" ? document.body : document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (id === "top") window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  else el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  const url = id === "top" ? window.location.pathname + window.location.search : `#${id}`;
  window.history.replaceState(null, "", url);
}
