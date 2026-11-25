/**
 * Подтверждённые сведения о детском саде «Жанбота».
 * Меняйте данные только здесь — они используются во всех разделах сайта.
 */
export const SITE = {
  name: "Жанбота",
  legalName: { kk: "ЖШС «Жанбота Н.С.»", ru: "ТОО «Жанбота Н.С.»" },
  director: { kk: "Аршидинова Арзыгуль Абриковна", ru: "Аршидинова Арзыгуль Абриковна" },
  bin: "230740003185",
  address: {
    kk: "Алматы қаласы, Алатау ауданы, Алғабас шағын ауданы, Мухитдинов көшесі, 71",
    ru: "г. Алматы, Алатауский район, мкр. Алгабас, ул. Мухитдинова, 71",
  },
  phone: "+7 701 319 70 81",
  phoneHref: "tel:+77013197081",
  whatsapp: "https://wa.me/77013197081",
  instagram: "https://www.instagram.com/zhanbotabalabakshasy/",
  instagramHandle: "@zhanbotabalabakshasy",
  email: "arzygulzhanbota@gmail.com",
  hours: "07:30–18:00",
  capacity: 70,
  groupsCount: 3,
  meals: 5,
  price: "40 000 ₸",
  coords: { lat: 43.248538, lng: 76.796847 },
} as const;

const { lat, lng } = SITE.coords;

export const MAP_LINKS = {
  /** Точка на карте 2GIS по координатам (без вымышленного ID организации). */
  twoGis: `https://2gis.kz/almaty/geo/${lng}%2C${lat}?m=${lng}%2C${lat}%2F17`,
  /** Маршрут в 2GIS: от текущего местоположения до детского сада. */
  twoGisRoute: `https://2gis.kz/almaty/directions/points/%7C${lng}%2C${lat}`,
  /** Встраиваемая карта OpenStreetMap — работает без ключей API. */
  embed: `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.006}%2C${lat - 0.0035}%2C${lng + 0.006}%2C${lat + 0.0035}&layer=mapnik&marker=${lat}%2C${lng}`,
};

export type Lang = "kk" | "ru";
export const LANGS: Lang[] = ["kk", "ru"];
export const DEFAULT_LANG: Lang = "kk";
export const LANG_STORAGE_KEY = "zhanbota-lang";
