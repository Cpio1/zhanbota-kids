"use client";

import { useState } from "react";
import { Building2, Clock, Hash, Mail, MapPin, Navigation, Phone, UserRound, Wallet, Hand } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { MAP_LINKS, SITE } from "@/lib/site";
import { Mascot } from "@/components/mascot/Mascot";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { ShapeBg } from "@/components/decor/shapes";
import { Cloud, Flower, OrnamentBand, Sparkle, Star, Yurt } from "@/components/decor/Decor";

function MapBox() {
  const { t } = useI18n();
  const [active, setActive] = useState(false);
  return (
    <div className="relative">
      <div className="clip-blob-c absolute -inset-[3%] -z-10 bg-teal-soft" aria-hidden="true" />
      <div className="relative h-[300px] overflow-hidden rounded-[44%_56%_40%_60%/14%_16%_14%_16%] bg-sky-soft shadow-[0_18px_40px_-22px_rgba(52,69,74,0.55)] sm:h-[340px] lg:h-[clamp(200px,36vh,360px)]">
        <iframe
          title={t.contacts.mapTitle}
          src={MAP_LINKS.embed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0"
          style={{ pointerEvents: active ? "auto" : "none" }}
        />
        {!active && (
          <button
            type="button"
            onClick={() => setActive(true)}
            className="absolute inset-0 flex items-end justify-center bg-transparent pb-4"
            aria-label={t.contacts.mapActivate}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-[0.85rem] font-extrabold text-ink shadow">
              <Hand className="h-4 w-4 text-teal-deep" aria-hidden="true" />
              {t.contacts.mapActivate}
            </span>
          </button>
        )}
      </div>
      <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <a href={MAP_LINKS.twoGis} target="_blank" rel="noopener noreferrer" className="btn-zh min-h-[44px] bg-[#6ecc4a] px-5 text-ink">
          <MapPin className="h-5 w-5" aria-hidden="true" />
          {t.contacts.open2gis}
        </a>
        <a href={MAP_LINKS.twoGisRoute} target="_blank" rel="noopener noreferrer" className="btn-zh min-h-[44px] bg-white px-5 text-ink shadow-[inset_0_0_0_2.5px_#67c8c7]">
          <Navigation className="h-5 w-5 text-teal-deep" aria-hidden="true" />
          {t.contacts.route}
        </a>
      </div>
    </div>
  );
}

export function Contacts() {
  const { t, lang } = useI18n();
  const L = t.contacts.labels;
  const rows: { icon: typeof Phone; label: string; value: string; href?: string; external?: boolean; wide?: boolean; color: string }[] = [
    { icon: Building2, label: L.org, value: SITE.legalName[lang], color: "#F5B041" },
    { icon: Hash, label: L.bin, value: SITE.bin, color: "#8CCB87" },
    { icon: UserRound, label: L.director, value: SITE.director[lang], wide: true, color: "#67C8C7" },
    { icon: MapPin, label: L.address, value: SITE.address[lang], href: MAP_LINKS.twoGis, external: true, wide: true, color: "#E99560" },
    { icon: Clock, label: L.hours, value: t.contacts.hours, color: "#91D5F5" },
    { icon: Wallet, label: L.price, value: t.contacts.price, color: "#8CCB87" },
    { icon: Phone, label: L.phone, value: SITE.phone, href: SITE.phoneHref, color: "#F5B041" },
    { icon: InstagramIcon as unknown as typeof Phone, label: L.instagram, value: SITE.instagramHandle, href: SITE.instagram, external: true, color: "#E99560" },
    { icon: Mail, label: L.email, value: SITE.email, href: `mailto:${SITE.email}`, wide: true, color: "#67C8C7" },
  ];

  const actions = [
    { href: SITE.phoneHref, label: t.contacts.call, icon: <Phone className="h-5 w-5" aria-hidden="true" />, cls: "bg-sun text-ink" },
    { href: SITE.whatsapp, label: t.contacts.whatsapp, icon: <WhatsAppIcon className="h-5 w-5" />, cls: "bg-wa text-white", ext: true },
    {
      href: SITE.instagram,
      label: t.contacts.instagram,
      icon: <InstagramIcon className="h-5 w-5" />,
      cls: "bg-[linear-gradient(135deg,#f5b041,#e99560_55%,#d96b8a)] text-white",
      ext: true,
    },
    { href: `mailto:${SITE.email}`, label: t.contacts.email, icon: <Mail className="h-5 w-5" aria-hidden="true" />, cls: "bg-white text-ink shadow-[inset_0_0_0_2.5px_#91d5f5]" },
  ];

  const actionsGrid = (
    <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
      {actions.map((a) => (
        <a
          key={a.label}
          href={a.href}
          {...(a.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className={`btn-zh min-h-[46px] px-5 text-[0.95rem] ${a.cls}`}
        >
          {a.icon}
          {a.label}
        </a>
      ))}
    </div>
  );

  return (
    <section id="contacts" aria-labelledby="contacts-title" className="section-zh overflow-hidden bg-cream">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <Cloud className="absolute left-[44%] top-[3%] w-20 animate-drift" />
        <Cloud className="absolute bottom-[6%] left-[2%] w-24 animate-drift-slow" color="#d8f0fc" shade="#c4e7f8" />
        <Star className="absolute right-[4%] top-[8%] w-5 animate-twinkle" />
        <Sparkle className="absolute bottom-[16%] right-[40%] w-4 animate-twinkle [animation-delay:1.6s]" color="#67c8c7" />
        <Flower className="absolute right-[2%] bottom-[30%] hidden w-7 animate-sway lg:block" petal="#8ccb87" />
      </div>

      <div className="container-zh grid items-center gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
        <div>
          <div className="flex items-end justify-between gap-3">
            <div>
              <SectionTitle kicker={t.contacts.kicker} title={t.contacts.title} color="#b85a22" wave="#e99560" id="contacts-title" />
              <Reveal delay={0.05}>
                <p className="lead-zh mt-2">{t.contacts.lead}</p>
              </Reveal>
            </div>
            <Mascot slot="contacts" alt={t.contacts.mascotAlt} className="w-[100px] shrink-0 lg:w-[clamp(96px,17vh,150px)]" />
          </div>

          <div className="mt-5 lg:hidden">{actionsGrid}</div>

          <Reveal delay={0.08} className="relative isolate mt-5 px-5 py-6 sm:px-7 lg:mt-[clamp(12px,2.6vh,24px)] lg:py-[clamp(18px,3.4vh,30px)]">
            <ShapeBg shape="wavyCard" fill="#ffffff" />
            <OrnamentBand className="absolute -top-2 right-8 h-4 w-28 opacity-80" color="#67c8c7" />
            <dl className="grid gap-x-5 gap-y-3 sm:grid-cols-2 lg:gap-y-[clamp(8px,1.5vh,14px)]">
              {rows.map(({ icon: Icon, label, value, href, external, wide, color }) => (
                <div key={label} className={`flex min-w-0 items-start gap-3 ${wide ? "sm:col-span-2" : ""}`}>
                  <span className="clip-blob-b flex h-9 w-9 shrink-0 items-center justify-center" style={{ background: color }}>
                    <Icon className="h-4 w-4 text-ink" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-[0.72rem] font-extrabold uppercase tracking-wide text-ink-soft">{label}</dt>
                    <dd className="break-words text-[0.95rem] font-extrabold leading-snug text-ink">
                      {href ? (
                        <a
                          href={href}
                          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="underline decoration-sun decoration-2 underline-offset-4 transition-colors hover:text-teal-deep"
                        >
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>

        </div>

        <Reveal delay={0.1} className="relative">
          <Yurt className="absolute -top-[46px] right-[8%] z-10 hidden w-16 lg:block" />
          <MapBox />
          <div className="hidden lg:block">{actionsGrid}</div>
        </Reveal>
      </div>
    </section>
  );
}
