import { defineConfig } from "@playwright/test";

export default defineConfig({
  reporter: [["html"], ["list"]],
  timeout: 30000,
  retries: 1,
  workers: 2,

  use: {
    baseURL:
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
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

  projects: [
    { name: "setup", testMatch: "playwright/auth/auth.setup.ts" },
    {
      name: "ui",
      testDir: "./tests/ui",
      dependencies: ["setup"],
      use: {
        storageState: "playwright/auth/user.json",
      },
    },
    {
      name: "api",
      testDir: "./tests/api",
    },
  ],
});
