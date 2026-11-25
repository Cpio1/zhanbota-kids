"use client";

import { ArrowUp, Phone, Mail } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { scrollToSection } from "@/lib/ui";
import { SITE } from "@/lib/site";
import { NAV_IDS } from "./Header";
import { LogoMark } from "./ui/LogoMark";
import { InstagramIcon, WhatsAppIcon } from "./ui/BrandIcons";
import { Mountains, OrnamentBand, WaveEdge } from "./decor/Decor";

export function Footer() {
  const { t, lang } = useI18n();
  const year = new Date().getFullYear();
  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection(id);
  };
  return (
    <footer id="site-footer" className="relative isolate overflow-hidden bg-teal-deep text-white">
      <WaveEdge className="absolute inset-x-0 top-0 -z-10" fill="#fff4dc" flip />
      <Mountains className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-16 w-full opacity-15" />
      <div className="container-zh pb-[calc(28px+env(safe-area-inset-bottom))] pt-14 lg:pt-16">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr_1fr] lg:items-start">
          <div>
            <a href="#top" onClick={go("top")} className="inline-flex items-center gap-2.5" aria-label={t.header.home}>
              <LogoMark className="h-11 w-11" />
              <span className="text-[1.45rem] font-black">{SITE.name}</span>
            </a>
            <p className="mt-2 max-w-sm text-[0.95rem] font-bold text-white/85">{t.footer.tagline}</p>
            <OrnamentBand className="mt-3 h-4 w-32 opacity-70" color="#fde7b8" />
          </div>
          <nav aria-label={t.header.navLabel}>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-[0.95rem] font-extrabold">
              {NAV_IDS.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={go(id)} className="text-white/90 transition-colors hover:text-sun">
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="grid gap-2 text-[0.95rem] font-bold">
            <a href={SITE.phoneHref} className="inline-flex items-center gap-2 hover:text-sun">
              <Phone className="h-4 w-4" aria-hidden="true" /> {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 break-all hover:text-sun">
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" /> {SITE.email}
            </a>
            <div className="mt-1 flex gap-2">
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-wa">
                <WhatsAppIcon className="h-5 w-5" />
              </a>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-peach">
                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3 border-t border-white/20 pt-5 text-[0.85rem] font-bold text-white/80 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.legalName[lang]} · {lang === "kk" ? "БСН" : "БИН"} {SITE.bin}. {t.footer.rights}
          </p>
          <a href="#top" onClick={go("top")} className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-white hover:bg-white/25">
            <ArrowUp className="h-4 w-4" aria-hidden="true" /> {t.footer.top}
          </a>
        </div>
      </div>
    </footer>
  );
}
