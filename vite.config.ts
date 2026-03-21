import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ['react-compiler']
        ]
      }
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@global': '/src/global',
      '@types': '/src/types',
      '@interfaces': '/src/interfaces',
      '@store': '/src/store',
      "@validation/*": '/src/validation',
    }
  }
})
