import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8391,
    strictPort: true,
    proxy: {
      '/api': 'http://localhost:8392',
      '/uploads': 'http://localhost:8392'
    }
  }
})
