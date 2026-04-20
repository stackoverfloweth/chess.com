/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { playwright } from '@vitest/browser-playwright'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    globals: true,
    include: ['src/tests/*.test.ts'],
    setupFiles: ['./vitest.setup.ts'],
    typecheck: {
      enabled: true,
      checker: 'vue-tsc',
      tsconfig: './tsconfig.app.json',
      include: ['src/tests/*.test-d.ts'],
    },
    browser: {
      enabled: true,
      provider: playwright(),
      headless: true,
      instances: [{ browser: 'chromium' }],
    },
  },
})
