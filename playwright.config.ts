import { defineConfig, devices } from "@playwright/test";

// E2E tests run against the production export (service worker enabled). Run `pnpm build` first.
export default defineConfig({
  testDir: "tests/e2e",
  timeout: 60_000,
  fullyParallel: false,
  workers: 1,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:4173",
    ...devices["Pixel 7"],
    // PW_CHANNEL=msedge (or chrome) reuses an installed browser instead of Playwright's Chromium.
    channel: process.env.PW_CHANNEL || undefined,
  },
  webServer: {
    command: "node scripts/serve-static.mjs",
    env: { PORT: "4173" },
    url: "http://localhost:4173/fr/",
    reuseExistingServer: false,
  },
});
