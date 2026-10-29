import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
    alias: {
      'server-only': fileURLToPath(new URL('./tests/stubs/empty.ts', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.{ts,tsx}'],
    setupFiles: ['./tests/setup.ts'],
    // Integration tests start an in-memory MongoDB; the first run downloads its binary.
    hookTimeout: 120_000,
  },
})
