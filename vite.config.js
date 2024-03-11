import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import Terminal from 'vite-plugin-terminal'

// https://vitejs.dev/config/
export default defineConfig({
  logLevel: 'info',
  plugins: [
    react()],
  server: {
    host: '10.102.13.68',
    port: 5173,
  },
})
