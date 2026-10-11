import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: process.env.VITE_ALLOWED_HOSTS
      ? process.env.VITE_ALLOWED_HOSTS.split(",").map((host) => host.trim()).filter(Boolean)
      : [],
  },
  preview: {
    allowedHosts: process.env.VITE_ALLOWED_HOSTS
      ? process.env.VITE_ALLOWED_HOSTS.split(",").map((host) => host.trim()).filter(Boolean)
      : [],
  },
})
