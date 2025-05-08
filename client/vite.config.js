import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    host: '0.0.0.0',
    port: import.meta.env.PORT || 4173,
    // 👇 Tu dodajesz swoją domenę Rendera
    allowedHosts: ['question-game-frontend.onrender.com']
  }
})
