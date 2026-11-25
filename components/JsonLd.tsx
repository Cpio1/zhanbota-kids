import { SITE } from "@/lib/site";

/** Структурированные данные schema.org (только подтверждённые сведения). */
export function JsonLd({ image }: { image?: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Preschool",
    name: "Жанбота",
    alternateName: [SITE.legalName.kk, SITE.legalName.ru],
    telephone: "+77013197081",
    email: SITE.email,
    sameAs: [SITE.instagram],
    ...(image && { image }),
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Мухитдинова, 71, мкр. Алгабас",
      addressLocality: "Алматы",
      addressRegion: "Алатауский район",
      addressCountry: "KZ",
    },
    geo: { "@type": "GeoCoordinates", latitude: SITE.coords.lat, longitude: SITE.coords.lng },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:30",
        closes: "18:00",
      },
    ],
    priceRange: "40 000 ₸ / месяц",
    availableLanguage: ["kk", "ru"],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
