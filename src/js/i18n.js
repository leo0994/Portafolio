import i18next from "https://unpkg.com/i18next@23.4.6/dist/esm/i18next.js";

// Detectar idioma del usuario o usar español por defecto
const userLang = navigator.language.startsWith('en') ? 'en' : 'es';

await i18next.init({
  lng: userLang,
  debug: true,
  resources: {
    es: {
      translation: await (await fetch("/Portafolio/locales/es/translation.json")).json(),
    },
    en: {
      translation: await (await fetch("/Portafolio/locales/en/translation.json")).json(),
    },
  },
});

export default i18next;
