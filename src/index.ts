import { createApp } from 'vue'
import naive from 'naive-ui'

// Create App
import App from './App.vue'
const app = createApp(App)

app.use(naive)

// Mount
const el = document.createElement('div')
el.id = 'inpageedit-app'
document.body.appendChild(el)
app.mount(el)
