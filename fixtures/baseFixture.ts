import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { LoginData } from "../data/LoginData";

export const test = base.extend<{
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  authenticatedDashboard: DashboardPage;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  authenticatedDashboard: async ({ loginPage, dashboardPage }, use) => {
    const username = LoginData.validUser.username;
    const password = LoginData.validUser.password;

    await loginPage.login(username, password);
    await use(dashboardPage);
  },
});
