import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { LoginData } from "../data/LoginData";
import { DashboardPage } from "../pages/DashboardPage";

test.beforeEach("Navigate to correct URL", async ({ page }) => {
  await page.goto("/");
});

test.describe("OrangeHRM Login", () => {
  test("Verify user can login with valid credentials", async ({ page }) => {
    //Arrange

    const username = LoginData.validUser.username;
    const password = LoginData.validUser.password;
    const loginPage = new LoginPage(page);
    const dashboardpage = new DashboardPage(page);
    // const dashboardText = page.locator(".oxd-topbar-header-breadcrumb-module");
    const expectedText = "Dashboard";

    //Act
    await loginPage.login(username, password);

    //Assert
    await expect(dashboardpage.getDashboardHeading()).toContainText(
      expectedText,
    );
  });
});
