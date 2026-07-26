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

    //Act
    await loginPage.login(username, password);

    //Assert
    await expect(dashboardpage.getDashboardHeading()).toContainText(
      "Dashboard",
    );
  });

  test("Verify user cannot login with invalid username", async ({ page }) => {
    //Arrange
    const username = LoginData.invalidUser.username;
    const password = LoginData.invalidUser.password;
    const loginPage = new LoginPage(page);

    //Act
    await loginPage.login(username, password);

    //Assert
    await expect(loginPage.getLoginErrorMsg()).toContainText(
      "Invalid credentials",
    );
  });

  test("Verify user cannot login with invalid password", async ({ page }) => {
    //Arrange
    const username = LoginData.invalidPassword.username;
    const password = LoginData.invalidPassword.password;
    const loginPage = new LoginPage(page);

    //Act
    await loginPage.login(username, password);

    //Assert
    await expect(loginPage.getLoginErrorMsg()).toContainText(
      "Invalid credentials",
    );
  });

  test("Verify user cannot login with empty username", async ({ page }) => {
    //Arrange
    const username = LoginData.emptyUsername.username;
    const password = LoginData.emptyUsername.password;
    const loginPage = new LoginPage(page);

    //Act
    await loginPage.login(username, password);

    //Assert
    await expect(loginPage.getUsernameReqErrMsg()).toContainText("Required");
  });

  test.only("Verify user cannot login with empty password", async ({
    page,
  }) => {
    //Arrange
    const username = LoginData.emptyPassword.username;
    const password = LoginData.emptyPassword.password;
    const loginPage = new LoginPage(page);

    //Act
    await loginPage.login(username, password);

    //Assert
    await expect(loginPage.getPasswordReqErrMsg()).toContainText("Required");
  });
});
