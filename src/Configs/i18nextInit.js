import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enLocale from 'i18n/en/common.json'
import itLocale from 'i18n/it/common.json'

export function i18nextInit() {
   i18n.use(initReactI18next).init({
      resources: {
         en: {
            common: enLocale
         },
         it: {
            common: itLocale
         }
      },
      lng: 'it',
      fallbackLng: 'it',

      interpolation: {
         escapeValue: false
      }
   })
}
