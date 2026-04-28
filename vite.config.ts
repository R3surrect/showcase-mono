import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
  },
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
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@global': path.resolve(__dirname, './src/global'),
      '@types': path.resolve(__dirname, './src/types'),
      '@interfaces': path.resolve(__dirname, './src/interfaces'),
      '@store': path.resolve(__dirname, './src/store'),
      '@validation': path.resolve(__dirname, './src/validation'),
      '@assets': path.resolve(__dirname, './src/assets'),
    }
  },
  build: {
    target: 'es2020',
    modulePreload: {
      polyfill: true
    }
  }
})
