import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      // Trỏ tới bộ component & assets của skill (nằm ngoài thư mục playground)
      '@mds': fileURLToPath(new URL('../components', import.meta.url)),
      '@assets': fileURLToPath(new URL('../../assets', import.meta.url)),
    },
  },
  server: {
    port: 5199,
    fs: { allow: ['../..'] },
  },
})
