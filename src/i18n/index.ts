import { createI18n } from 'vue-i18n'
import pluralRules from './rules/pluralization'
import numberFormats from './rules/numbers.js'
import en from './locales/en.json'
import pt from './locales/pt-br.json'

export default createI18n({
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
  legacy: false,
  globalInjection: true,
  messages: { en, pt },
  pluralRules,
  numberFormats
})
