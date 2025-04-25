export default {
    defaultLocale: 'en',
    supportedLocales: ['es', 'en'],
    translations: {
      es: () => import('../../public/locales/es/translation.json'),
      en: () => import('../../public/locales/en/translation.json'),
    },
  };
  