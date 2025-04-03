import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js' // Ensure PostCSS is applied
  },
  build: {
    outDir: 'dist', // Ensure Vercel finds the output directory
    assetsDir: 'assets' // Optional: Organizes assets properly
  }
})
