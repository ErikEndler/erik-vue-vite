import i18n from '@/i18n'
import { nextTick } from 'vue'

const Trans = {
  get defaultLocale() {
    return import.meta.env.VITE_DEFAULT_LOCALE
  },

  get supportedLocales() {
    return import.meta.env.VITE_SUPPORTED_LOCALES.split(',')
  },

  set currentLocale(newLocale: string) {
    i18n.global.locale.value = newLocale
  },

  async switchLanguage(newLocale: string) {
    await Trans.loadLocaleMessages(newLocale)
    Trans.currentLocale = newLocale
    document.querySelector('html')?.setAttribute('lang', newLocale)
    localStorage.setItem('user-locale', newLocale)
  },

  async loadLocaleMessages(locale: string) {
    if (!i18n.global.availableLocales.includes(locale)) {
      const messages = await import(`@/i18n/locales/${locale}.json`)
      i18n.global.setLocaleMessage(locale, messages.default)
    }

    return nextTick()
  }
}

export default Trans
