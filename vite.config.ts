/// <reference types="vitest" />
// Configure Vitest (https://vitest.dev/config/)

import { defineConfig, loadEnv } from "vite"

export default defineConfig({
  test: {
    setupFiles: ["vitest.setup.ts"],
    dangerouslyIgnoreUnhandledErrors: true,
    env: loadEnv("test.local", process.cwd(), ""),
  },
})