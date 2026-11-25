"use client";

import { BadgeCheck, ExternalLink, FileText, FileSignature, Files, Landmark, ScrollText, Hourglass } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { assetUrl } from "@/lib/asset";
import { SITE } from "@/lib/site";
import { DOCUMENTS, type DocumentCategory } from "@/config/documents";
import { Mascot } from "@/components/mascot/Mascot";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ShapeBg } from "@/components/decor/shapes";
import { BookIcon, Cloud, Ornament, Paper, Pencil, Sparkle, Star } from "@/components/decor/Decor";

const STYLE: Record<DocumentCategory["id"], { icon: typeof FileText; fill: string; tab: string; tilt: string }> = {
  registration: { icon: Landmark, fill: "#FDE7B8", tab: "#F5B041", tilt: "lg:-rotate-[1.5deg]" },
  charter: { icon: ScrollText, fill: "#CDEEEE", tab: "#67C8C7", tilt: "lg:rotate-[1.2deg] lg:translate-y-3" },
  permits: { icon: BadgeCheck, fill: "#D9EFD6", tab: "#8CCB87", tilt: "lg:-rotate-[0.8deg]" },
  contracts: { icon: FileSignature, fill: "#FBDCC6", tab: "#E99560", tilt: "lg:rotate-[1deg]" },
  other: { icon: Files, fill: "#D8F0FC", tab: "#91D5F5", tilt: "lg:-rotate-[1.2deg] lg:translate-y-2" },
};

export function Documents() {
  const { t, lang } = useI18n();

  return (
    <section id="documents" aria-labelledby="documents-title" className="section-zh overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="clip-blob-a absolute -left-24 bottom-[-60px] h-72 w-72 bg-leaf-soft opacity-60" />
        <div className="clip-blob-c absolute -right-20 top-6 h-56 w-56 bg-sun-soft opacity-50" />
        <Cloud className="absolute right-[34%] top-[5%] w-20 animate-drift" color="#d9efd6" shade="#c4e4c0" />
        <Star className="absolute bottom-[10%] right-[8%] w-5 animate-twinkle" color="#67c8c7" />
        <Sparkle className="absolute left-[30%] top-[12%] w-4 animate-twinkle [animation-delay:1s]" color="#f5b041" />
      </div>

      <div className="container-zh grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <div className="relative">
          <SectionTitle kicker={t.documents.kicker} title={t.documents.title} color="#3f8a3a" wave="#8ccb87" id="documents-title" />
          <Reveal delay={0.05}>
            <p className="lead-zh mt-3">{t.documents.lead}</p>
          </Reveal>

          <div className="relative mt-4 flex items-end gap-3 lg:mt-[clamp(10px,2.4vh,24px)]">
            <Mascot slot="documents" alt={t.documents.mascotAlt} className="w-[120px] shrink-0 lg:w-[clamp(110px,22vh,180px)]" />
            <div className="relative mb-4 flex-1" aria-hidden="true">
              <Paper className="absolute -top-16 left-2 w-9 -rotate-12 animate-bob" color="#e99560" />
              <BookIcon className="absolute -top-10 left-16 w-12 rotate-6" color="#8ccb87" />
              <Pencil className="absolute -top-20 left-24 w-12 rotate-[30deg] animate-sway" color="#67c8c7" />
            </div>
          </div>

          <Reveal delay={0.1}>
            <p className="mt-3 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-[22px_30px_24px_28px] bg-cream px-4 py-2.5 text-[0.9rem] font-extrabold text-ink">
              <Ornament className="w-6" color="#e99560" width={4} />
              {SITE.legalName[lang]}
              <span className="text-ink-soft">·</span>
              <span>
                {t.documents.binLabel} {SITE.bin}
              </span>
            </p>
          </Reveal>
        </div>

        <div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-x-4 lg:gap-y-[clamp(12px,2.4vh,22px)]">
            {DOCUMENTS.map((cat, i) => {
              const s = STYLE[cat.id];
              const Icon = s.icon;
              return (
                <Reveal
                  as="li"
                  key={cat.id}
                  delay={0.06 * i}
                  className={`relative isolate px-6 pb-6 pt-9 lg:pb-[clamp(16px,3vh,26px)] lg:pt-[clamp(26px,4.6vh,40px)] ${s.tilt} ${i < 3 ? "lg:col-span-2" : "lg:col-span-3"} ${
                    i === 4 ? "sm:col-span-2 lg:col-span-3" : ""
                  }`}
                >
                  <ShapeBg shape="folder" fill={s.fill} />
                  <span className="absolute left-[9%] top-[6%] h-2 w-[22%] rounded-full opacity-80" style={{ background: s.tab }} aria-hidden="true" />
                  <div className="flex items-start gap-3">
                    <span className="clip-blob-c flex h-11 w-11 shrink-0 items-center justify-center" style={{ background: s.tab }}>
                      <Icon className="h-5 w-5 text-ink" aria-hidden="true" />
                    </span>
                    <h3 className="pt-1 text-[1.02rem] font-black leading-snug text-ink">{t.documents.categories[cat.id]}</h3>
                  </div>
                  {cat.items.length > 0 ? (
                    <ul className="mt-3 grid gap-1.5">
                      {cat.items.map((doc) => (
                        <li key={doc.url}>
                          <a
                            href={doc.url.startsWith("/") ? assetUrl(doc.url) : doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 rounded-full bg-white/85 px-3 py-2 text-[0.9rem] font-bold text-ink transition-colors hover:bg-white"
                          >
                            <FileText className="h-4 w-4 shrink-0 text-ink-soft" aria-hidden="true" />
                            <span className="min-w-0 flex-1 truncate">{doc.title[lang]}</span>
                            <span className="shrink-0 text-[0.72rem] font-black uppercase text-ink-soft">{t.documents[doc.kind]}</span>
                            <ExternalLink className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                            <span className="sr-only">{t.documents.open}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border-2 border-dashed border-ink/15 bg-white/60 px-3 py-1 text-[0.82rem] font-extrabold text-ink-soft">
                      <Hourglass className="h-3.5 w-3.5" aria-hidden="true" />
                      {t.documents.soon}
                    </p>
                  )}
                </Reveal>
              );
            })}
          </ul>
          <p className="mt-4 text-center text-[0.88rem] font-bold text-ink-soft lg:mt-[clamp(10px,2.4vh,22px)] lg:text-left">{t.documents.note}</p>
        </div>
      </div>
    </section>
  );
}
