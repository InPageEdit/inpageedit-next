import { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default {
  // root: './src',
  build: {
    target: 'es2015',
    lib: {
      entry: 'src/index.ts',
      name: 'InPageEdit',
      formats: ['umd'],
      fileName: 'InPageEdit',
    },
    // rollupOptions: {
    //   output: {
    //     dir: 'dist',
    // formats: ['umd'],
    //   },
    // },
    outDir: 'dist',
    // sourcemap: true,
    watch: {
      exclude: ['node_modules/**', './dist'],
      buildDelay: 500,
    },
  },
  server: {
    host: '127.0.0.1',
    port: 1005,
  },
  plugins: [vue()],
} as UserConfig
