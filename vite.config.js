import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// On GitHub Pages the site is served from /<repo>/, so the CI workflow sets
// GITHUB_PAGES=true to build with the right base path. Other hosts (Netlify,
// Vercel) serve from root and leave it unset.
//
// Multi-page build: the personal site lives at / (index.html) and the EMR
// app is a separate page at /emr.html.
export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/serenest-edu/' : '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        emr: resolve(__dirname, 'emr.html'),
      },
    },
  },
})
