import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import autoImport from 'unplugin-auto-import/vite'
import vueComponents from 'unplugin-vue-components/vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      name: 'InPageEdit',
      fileName: 'index',
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['cjs', 'es', 'umd'],
    },
    sourcemap: true,
  },
  server: {
    host: true,
    port: 1005,
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  plugins: [
    vue(),
    vueJsx(),
    autoImport({
      imports: ['vue', 'pinia'],
    }),
    vueComponents(),
    dts(),
  ],
})
