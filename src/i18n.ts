import { createI18n } from 'vue-i18n'

const messages = {
  en: require('./locales/en.json'),
  'zh-Hans': require('./locales/zh-Hans.json'),
}

export const i18n = createI18n({
  globalInjection: true,
  legacy: false,
  locale: 'zh-Hans',
  messages,
})
