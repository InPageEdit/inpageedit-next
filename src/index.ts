import { createApp } from 'vue'
import naive from 'naive-ui'

// Create App
import App from './App.vue'
const app = createApp(App)

import { i18n } from './i18n'
app.use(i18n)

app.use(naive)

// Mount
const el = document.createElement('div')
el.id = 'inpageedit-app'
document.body.appendChild(el)
app.mount(el)
