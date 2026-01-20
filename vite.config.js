// config for vite slik at jeg kan raskt test om siden fungerer

import { defineConfig } from 'vite'

export default defineConfig({
  root: 'Frontend',
  base: '/',
  build: {
    outDir: '../docs'
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
