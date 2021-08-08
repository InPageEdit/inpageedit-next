import { createApp } from 'vue'

// Create App
import App from './App.vue'
const app = createApp(App)

// Mount
const el = document.createElement('div')
el.id = 'inpageedit-app'
document.body.appendChild(el)
app.mount(el)
