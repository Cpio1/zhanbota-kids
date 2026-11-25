/**
 * Группы детского сада.
 *
 * Сейчас используются нейтральные названия. Когда владелец сада предоставит
 * официальные названия и возраст детей — заполните поля `name` и `age`.
 * Если `age` = null, строка с возрастом на сайте не показывается.
 */
export interface GroupConfig {
  id: string;
  name: { kk: string; ru: string };
  age: { kk: string; ru: string } | null;
  /** Оформление: yellow — облако, teal — органическая фигура, green — волнистая фигура. */
  theme: "yellow" | "teal" | "green";
}

export const GROUPS: GroupConfig[] = [
  { id: "group-1", name: { kk: "1-топ", ru: "Группа №1" }, age: null, theme: "yellow" },
  { id: "group-2", name: { kk: "2-топ", ru: "Группа №2" }, age: null, theme: "teal" },
  { id: "group-3", name: { kk: "3-топ", ru: "Группа №3" }, age: null, theme: "green" },
];
