import i18next from "https://unpkg.com/i18next@23.4.6/dist/esm/i18next.js";

// Obtener idioma guardado en localStorage o detectar del navegador
const savedLang = localStorage.getItem('lang');
const userLang = savedLang || (navigator.language.startsWith('en') ? 'en' : 'es');

await i18next.init({
  lng: userLang,
  debug: false,
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
