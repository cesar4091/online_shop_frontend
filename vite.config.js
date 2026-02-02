import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Cualquier petición a /auth será redirigida a tu backend online
      '/auth': {
        target: 'https://online-shop-api-cn9l.onrender.com', // <--- TU URL ONLINE
        changeOrigin: true,
        secure: false, // Acepta HTTPS aunque sea desarrollo
      },
      // Si tienes otras rutas API
      '/login': {
        target: 'https://online-shop-api-cn9l.onrender.com',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
