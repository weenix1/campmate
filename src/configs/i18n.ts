// src/configs/i18n.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpBackend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'de',
    backend: {
      loadPath: '/locales/{{lng}}.json',
    },
    debug: false,
    // keySeparator: false,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
    },
  })

export default i18n
