import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return undefined
          }

          if (id.includes('@tiptap')) {
            return 'editor'
          }

          if (id.includes('react-router-dom')) {
            return 'router'
          }

          if (id.includes('react-dom') || id.includes('react')) {
            return 'react-vendor'
          }

          if (id.includes('axios')) {
            return 'network'
          }

          if (id.includes('zustand')) {
            return 'state'
          }

          if (id.includes('react-helmet-async')) {
            return 'helmet'
          }

          return 'vendor'
        },
      },
    },
  },
})
