import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

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
  plugins: [dts()],
})
