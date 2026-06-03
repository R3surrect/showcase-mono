/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import postcssCustomMedia from 'postcss-custom-media';

// https://vite.dev/config/
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  server: {
    host: true,
    fs: {
      allow: ['searchForWorkspaceRoot(process.cwd())', '../backend']
    },
  },
  plugins: [react({
    babel: {
      plugins: [['react-compiler']]
    }
  })],
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
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@backend": path.resolve(__dirname, "../backend/src/")
    }
  },
  build: {
    target: 'es2020',
    modulePreload: {
      polyfill: true
    }
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
        storybookTest({
          configDir: path.join(dirname, '.storybook')
        })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        }
      }
    }]
  },
  css: {
    postcss: {
      plugins: [postcssCustomMedia()]
    }
  },
});