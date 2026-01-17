import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        // Using the IPv4 address directly prevents ECONNREFUSED in Node.js 17+
        target: 'https://furniture-shop-xsj0.onrender.com/',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})