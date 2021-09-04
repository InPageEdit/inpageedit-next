import { createI18n } from 'vue-i18n'
import * as en from './locales/en.json'
import * as zhHans from './locales/zh-Hans.json'

const messages = {
  en,
  'zh-Hans': zhHans,
}

export const i18n = createI18n({
  globalInjection: true,
  legacy: false,
  locale: 'zh-Hans',
  messages,
})
