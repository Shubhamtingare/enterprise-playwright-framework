import { expect, test as setup } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { env } from "../config/env";
import { DashboardPage } from "../pages/DashboardPage";

setup("Authentication", async ({ page }) => {
  const storagePath = "playwright/auth/user.json";
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await page.goto("/");

  await loginPage.login(env.username!, env.password!);

  await expect(dashboardPage.getDashboardHeading()).toContainText("Dashboard");

  await page.context().storageState({ path: storagePath });
});
