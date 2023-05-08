import { createI18n } from 'vue-i18n'
import pluralRules from './rules/pluralization'
import numberFormats from './rules/numbers.js'
import en from './locales/en.json'
import ru from './locales/ru.json'

export default createI18n({
  locale: import.meta.env.VITE_DEFAULT_LOCALE, // <--- 1
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE, // <--- 2
  legacy: false, // <--- 3
  globalInjection: true, // <--- add this
  messages: { en, ru },
  pluralRules,
  numberFormats
})
