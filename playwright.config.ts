import {
  defineConfig,
  devices,
} from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",

  fullyParallel: true,

  forbidOnly: false,

  retries: 0,

  workers: undefined,

  reporter: "html",

  use: {
    baseURL: "http://localhost:5173",

    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],

  webServer: {
    command: "npm run dev -- --host localhost",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
  },
});