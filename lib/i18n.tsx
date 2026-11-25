"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_LANG, LANG_STORAGE_KEY, type Lang } from "./site";
import { DICTIONARIES, type Dictionary } from "@/locales/dictionary";

interface I18nValue {
  lang: Lang;
  t: Dictionary;
  setLang: (lang: Lang) => void;
}

const I18nContext = createContext<I18nValue | null>(null);

function readStoredLang(): Lang | null {
  try {
    const v = window.localStorage.getItem(LANG_STORAGE_KEY);
    return v === "kk" || v === "ru" ? v : null;
  } catch {
    return null;
  }
}

/** Синхронизирует <html lang>, <title> и meta description с выбранным языком. */
function applyDocumentLang(lang: Lang) {
  const t = DICTIONARIES[lang];
  const root = document.documentElement;
  root.lang = lang;
  document.title = t.meta.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", t.meta.description);
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", t.meta.title);
  document.querySelector('meta[property="og:description"]')?.setAttribute("content", t.meta.description);
  document.querySelector('meta[property="og:locale"]')?.setAttribute("content", lang === "kk" ? "kk_KZ" : "ru_RU");
}

/**
 * Язык по умолчанию — казахский. Меняется ТОЛЬКО вручную переключателем KZ/RU.
 * Язык браузера, геолокация и системные настройки не учитываются.
 * Выбор пользователя сохраняется в localStorage.
 */
export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    const stored = readStoredLang();
    if (stored && stored !== DEFAULT_LANG) setLangState(stored);
  }, []);

  useEffect(() => {
    applyDocumentLang(lang);
    // Next.js может переустановить <title> из metadata после гидратации — повторяем чуть позже.
    const retry = window.setTimeout(() => applyDocumentLang(lang), 400);
    // Перевод применён — показываем страницу (см. inline-скрипт в layout.tsx).
    const id = requestAnimationFrame(() => document.documentElement.classList.remove("lang-pending"));
    return () => {
      cancelAnimationFrame(id);
      window.clearTimeout(retry);
    };
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      /* приватный режим — язык просто не запомнится */
    }
  }, []);

  const value = useMemo(() => ({ lang, t: DICTIONARIES[lang], setLang }), [lang, setLang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}

/** Подстановка {name} в строку перевода. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => String(values[k] ?? ""));
}
