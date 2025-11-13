import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// For GitHub Pages project site at https://<user>.github.io/<repo>,
// set base to '/<repo>/' so assets are referenced correctly.
export default defineConfig({
  plugins: [react()],
  base: '/svatba/',
})
