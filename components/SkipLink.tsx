"use client";

import { useI18n } from "@/lib/i18n";

export function SkipLink() {
  const { t } = useI18n();
  return (
    <a
      href="#main"
      className="fixed left-3 top-3 z-[100] -translate-y-24 rounded-full bg-ink px-4 py-2 font-extrabold text-white transition-transform focus:translate-y-0"
    >
      {t.skip}
    </a>
  );
}
