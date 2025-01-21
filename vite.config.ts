/// <reference types="vitest" />

// Configure Vitest (https://vitest.dev/config/)

import { defineConfig, loadEnv } from "vite"

export default defineConfig({
  test: {
    /* for example, use global to avoid globals imports (describe, test, expect): */
    // globals: true,
    setupFiles: ["vitest.setup.ts"],
    dangerouslyIgnoreUnhandledErrors: true,
    env: loadEnv("test.local", process.cwd(), ""),
  },
})