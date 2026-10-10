import { defineConfig, devices } from "@playwright/test";

// Point the same browser suite at a Cloudflare branch preview when supplied.
const previewURL = process.env.PLAYWRIGHT_BASE_URL;

export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: previewURL ?? "http://127.0.0.1:4321",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: previewURL
    ? undefined
    : {
        command: "node .yarn/releases/yarn-4.18.1.cjs preview --host 127.0.0.1",
        url: "http://127.0.0.1:4321",
        reuseExistingServer: !process.env.CI,
      },
});
