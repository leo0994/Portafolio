import i18next from "https://unpkg.com/i18next@23.4.6/dist/esm/i18next.js";

// Obtener idioma guardado en localStorage o detectar del navegador
const savedLang = localStorage.getItem('lang');
const userLang = savedLang || (navigator.language.startsWith('en') ? 'en' : 'es');

// Base path dinámico (funciona en desarrollo y producción)
const basePath = import.meta.env.BASE_URL.endsWith('/') 
  ? import.meta.env.BASE_URL.slice(0, -1) 
  : import.meta.env.BASE_URL;

await i18next.init({
  lng: userLang,
  debug: false,
  resources: {
    es: {
      translation: await (await fetch(`${basePath}/locales/es/translation.json`)).json(),
    },
    en: {
      translation: await (await fetch(`${basePath}/locales/en/translation.json`)).json(),
    },
  },
});

export default i18next;
