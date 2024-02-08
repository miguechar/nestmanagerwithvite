import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Terminal from 'vite-plugin-terminal'

// https://vitejs.dev/config/
export default defineConfig({
  logLevel: 'info',
  plugins: [
    react(), Terminal()],
  server: {
    host: '10.102.30.12',
    port: 5173,
  },
})
