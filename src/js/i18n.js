import i18next from "https://unpkg.com/i18next@23.4.6/dist/esm/i18next.js";

await i18next.init({
  lng:  userLang,
  debug: true,
  resources: {
    es: {
      translation: await (await fetch("/locales/es/translation.json")).json(),
    },
    en: {
      translation: await (await fetch("/locales/en/translation.json")).json(),
    },
  },
});

export default i18next;
