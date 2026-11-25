/** Путь к файлу из /public с учётом basePath (GitHub Pages в подпапке репозитория). */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function assetUrl(path: string): string {
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:") || path.startsWith("mailto:")) return path;
  const clean = path.replace(/^\/+/, "");
  return `${BASE_PATH}/${clean}`;
}
