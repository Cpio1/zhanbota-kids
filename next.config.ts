import type { NextConfig } from "next";

/**
 * Базовый путь сайта (basePath).
 *
 *  • Vercel, собственный домен, локальная разработка → "" (сайт в корне).
 *  • GitHub Pages по адресу <user>.github.io/<repo> → "/<repo>".
 *
 * Значение берётся из переменных окружения (по приоритету):
 *   1. NEXT_PUBLIC_BASE_PATH — ручная настройка (например, "/my-repo");
 *   2. PAGES_BASE_PATH — автоматически передаёт GitHub Actions (actions/configure-pages).
 * Если собственный домен подключён в настройках GitHub Pages, configure-pages вернёт "".
 */
function resolveBasePath(): string {
  const raw = process.env.NEXT_PUBLIC_BASE_PATH ?? process.env.PAGES_BASE_PATH ?? "";
  const trimmed = raw.trim().replace(/\/+$/, "");
  if (!trimmed) return "";
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

const basePath = resolveBasePath();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Полностью статический сайт: папка out/ публикуется на GitHub Pages, Vercel или любой хостинг.
  output: "export",
  trailingSlash: true,
  ...(basePath && { basePath }),
  // Без серверной оптимизации изображений.
  images: { unoptimized: true },
  // basePath доступен в клиентском коде — для путей к файлам из /public.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
