import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// On GitHub Pages the site is served from /<repo>/, so the CI workflow sets
// GITHUB_PAGES=true to build with the right base path. Other hosts (Netlify,
// Vercel) serve from root and leave it unset.
export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/serenest-edu/' : '/',
  plugins: [react()],
})
