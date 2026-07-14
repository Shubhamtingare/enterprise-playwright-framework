import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  reporter: [["html"], ["list"]],
  timeout: 30000,
  retries: 1,
  workers: 2,

  use: {
    baseURL: "https://www.saucedemo.com",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "on-first-retry",
    browserName: "chromium",
    viewport: {
      width: 1920,
      height: 1080,
    },
    headless: false,
  },
});
