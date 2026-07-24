import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { LoginData } from "../data/LoginData";

test.describe("OrangeHRM Login", () => {
  test("Verify user can login with valid credentials", async ({ page }) => {
    //Arrange

    const username = LoginData.validUser.username;
    const password = LoginData.validUser.password;
    const loginPage = new LoginPage(page);
    const dashboardText = page.locator(".oxd-topbar-header-breadcrumb-module");
    const expectedText = "Dashboard";

    //Act
    await page.goto("/");
    await loginPage.login(username, password);

    //Assert
    await expect(dashboardText).toContainText(expectedText);
  });
});
