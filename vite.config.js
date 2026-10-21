import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
      '@designcodeio/threeui/style.css': path.resolve(import.meta.dirname, './src/shaders/threeui.css'),
      '@designcodeio/threeui': path.resolve(import.meta.dirname, './src/shaders/shader-buttons/ShaderButtons.tsx'),
    },
  },
  server: {
    port: 5175,
  },
})
