import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import { ClipDefs } from "@/components/decor/shapes";
import { assetUrl } from "@/lib/asset";
import { LANG_STORAGE_KEY } from "@/lib/site";
import { DICTIONARIES } from "@/locales/dictionary";
import "./globals.css";

// Nunito: полная поддержка казахской кириллицы (Ә Ғ Қ Ң Ө Ұ Ү І Һ) в одном начертании с остальными буквами.
const nunito = Nunito({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-nunito",
});

const kk = DICTIONARIES.kk;
// Абсолютный адрес сайта для Open Graph: задаётся вручную (NEXT_PUBLIC_SITE_URL),
// автоматически на GitHub Pages (workflow) и на Vercel (VERCEL_PROJECT_PRODUCTION_URL).
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "")
).replace(/\/+$/, "");
// siteUrl — полный адрес сайта (уже включает подпапку GitHub Pages), поэтому путь без basePath.
const ogImages = siteUrl ? [{ url: "og-image.png", width: 1200, height: 630, alt: "Жанбота" }] : undefined;

export const metadata: Metadata = {
  ...(siteUrl && { metadataBase: new URL(siteUrl + "/") }),
  title: kk.meta.title,
  description: kk.meta.description,
  applicationName: "Жанбота",
  keywords: ["Жанбота", "балабақша", "детский сад", "Алматы", "Алатау ауданы", "Алгабас", "жеке балабақша", "частный детский сад"],
  ...(siteUrl && { alternates: { canonical: "./" } }),
  openGraph: {
    type: "website",
    siteName: "Жанбота",
    title: kk.meta.title,
    description: kk.meta.description,
    locale: "kk_KZ",
    alternateLocale: ["ru_RU"],
    ...(ogImages && { images: ogImages }),
  },
  twitter: { card: "summary_large_image", title: kk.meta.title, description: kk.meta.description, ...(ogImages && { images: ogImages }) },
  icons: { icon: [{ url: assetUrl("favicon.svg"), type: "image/svg+xml" }], apple: assetUrl("apple-touch-icon.png") },
  formatDetection: { telephone: false },
  other: { "supported-color-schemes": "light" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFF4DC",
  colorScheme: "only light",
};

// Выбранный пользователем язык (только из localStorage). Если это RU — скрываем страницу до применения
// перевода, чтобы не было «мигания». Язык браузера и системы намеренно не учитываются.
const langScript = `try{var l=localStorage.getItem(${JSON.stringify(LANG_STORAGE_KEY)});if(l==="ru"){var d=document.documentElement;d.lang="ru";d.classList.add("lang-pending");setTimeout(function(){d.classList.remove("lang-pending")},1500)}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kk" className={nunito.variable} style={{ colorScheme: "only light" }} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: langScript }} />
      </head>
      <body className="bg-cream text-ink">
        <ClipDefs />
        {children}
      </body>
    </html>
  );
}
