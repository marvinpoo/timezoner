import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import * as locales from './locales';

const initI18n = () => {
  return i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: locales,
      fallbackLng: 'en',
      supportedLngs: Object.keys(locales),
      detection: {
        order: ['localStorage', 'navigator'],
        lookupLocalStorage: 'preferredLanguage',
        caches: ['localStorage']
      },
      interpolation: {
        escapeValue: false
      },
      load: 'languageOnly',
      // Force English as default language
    });
};

export default initI18n;