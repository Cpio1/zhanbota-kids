/**
 * Официальные документы детского сада.
 *
 * Как добавить документ:
 *  1. PDF-файл: положите его в папку public/docs и укажите url: "/docs/имя-файла.pdf", kind: "pdf".
 *  2. Google Drive / облако: укажите полную ссылку, kind: "drive" или "link".
 *
 * Пустой список в категории = на сайте показывается «Документ будет добавлен позднее».
 * Не добавляйте ссылки на несуществующие документы.
 */
export type DocumentKind = "pdf" | "drive" | "link";

export interface DocumentItem {
  title: { kk: string; ru: string };
  url: string;
  kind: DocumentKind;
}

export interface DocumentCategory {
  id: "registration" | "charter" | "permits" | "contracts" | "other";
  items: DocumentItem[];
}

export const DOCUMENTS: DocumentCategory[] = [
  { id: "registration", items: [] },
  { id: "charter", items: [] },
  { id: "permits", items: [] },
  { id: "contracts", items: [] },
  { id: "other", items: [] },
];
