import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import autoImport from 'unplugin-auto-import/vite'
import vueComponents from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    Vue(),
    VueJsx(),
    autoImport({
      imports: ['vue', 'pinia'],
    }),
    vueComponents(),
  ],
})
