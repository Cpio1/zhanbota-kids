// Серверные хелперы: во время сборки находят реальные файлы в /public.
// Если файла нет — ничего не подставляется (используются SVG-заглушки).
import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";
import { assetUrl } from "./asset";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const IMAGE_EXT = [".png", ".jpg", ".jpeg", ".webp", ".avif"];
const VIDEO_EXT = [".mp4", ".webm", ".mov"];

export interface ImageAsset {
  src: string;
  width: number;
  height: number;
}
export interface VideoAsset {
  src: string;
  mime: string;
}

const toSrc = (rel: string) => assetUrl(rel.split(path.sep).map(encodeURIComponent).join("/"));

function readImage(rel: string): ImageAsset | null {
  const abs = path.join(PUBLIC_DIR, rel);
  if (!fs.existsSync(abs)) return null;
  try {
    const { width, height, orientation } = imageSize(fs.readFileSync(abs));
    if (!width || !height) return null;
    const rotated = orientation !== undefined && orientation >= 5; // EXIF-поворот фото с телефона
    return { src: toSrc(rel), width: rotated ? height : width, height: rotated ? width : height };
  } catch {
    return null;
  }
}

/** Ищет base + расширение в нескольких папках (пути относительно /public). */
function findFile(base: string, exts: string[], dirs: string[]): string | null {
  for (const dir of dirs) {
    for (const ext of exts) {
      for (const e of [ext, ext.toUpperCase()]) {
        const rel = path.join(dir, base + e);
        if (fs.existsSync(path.join(PUBLIC_DIR, rel))) return rel;
      }
    }
  }
  return null;
}

const HERO_DIRS = ["images/hero", "images", ""];

/** Фото главного экрана: main-page.png (или .jpg/.webp). */
export function getHeroImage(): ImageAsset | null {
  const f = findFile("main-page", IMAGE_EXT, HERO_DIRS);
  return f ? readImage(f) : null;
}

/** Дополнительное видео главного экрана: main-page2.mp4 / .webm / .mov. */
export function getHeroVideo(): VideoAsset | null {
  const f = findFile("main-page2", VIDEO_EXT, HERO_DIRS);
  if (!f) return null;
  const ext = path.extname(f).toLowerCase();
  return { src: toSrc(f), mime: ext === ".webm" ? "video/webm" : ext === ".mov" ? "video/quicktime" : "video/mp4" };
}

/** Фото для раздела «О нас»: about.jpg/png. */
export function getAboutImage(): ImageAsset | null {
  const f = findFile("about", IMAGE_EXT, HERO_DIRS);
  return f ? readImage(f) : null;
}

export const MASCOT_FILES = ["hero", "about", "groups", "nutrition", "gallery", "documents", "contacts"] as const;
export type MascotName = (typeof MASCOT_FILES)[number];

/** PNG-маскоты с прозрачным фоном из public/images/mascots/<имя>.png. */
export function getMascots(): Partial<Record<MascotName, string>> {
  const out: Partial<Record<MascotName, string>> = {};
  for (const name of MASCOT_FILES) {
    const f = findFile(name, [".png", ".webp", ".svg"], ["images/mascots"]);
    if (f) out[name] = toSrc(f);
  }
  return out;
}

/** Фотографии из public/images/gallery, отсортированные по имени файла. */
export function getGalleryPhotos(): ImageAsset[] {
  const dir = path.join(PUBLIC_DIR, "images", "gallery");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => !f.startsWith(".") && IMAGE_EXT.includes(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((f) => readImage(path.join("images", "gallery", f)))
    .filter((x): x is ImageAsset => x !== null);
}
