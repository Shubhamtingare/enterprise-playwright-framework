import { test } from "../fixtures/baseFixture";
import { expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { LoginData } from "../data/LoginData";
import { DashboardPage } from "../pages/DashboardPage";

test.beforeEach("Navigate to correct URL", async ({ page }) => {
  await page.goto("/");
});

test.describe("OrangeHRM Login", () => {
  test.describe("Positive scenarios", () => {
    test("Verify user can login with valid credentials", async ({
      loginPage,
      page,
    }) => {
      //Arrange

      const username = LoginData.validUser.username;
      const password = LoginData.validUser.password;
      const dashboardpage = new DashboardPage(page);

      //Act
      await loginPage.login(username, password);

      //Assert
      await expect(dashboardpage.getDashboardHeading()).toContainText(
        "Dashboard",
      );
    });
  });

  test.describe("Negative scenarios", () => {
    test("Verify user cannot login with invalid username", async ({
      loginPage,
    }) => {
      //Arrange
      const username = LoginData.invalidUser.username;
      const password = LoginData.invalidUser.password;

      //Act
      await loginPage.login(username, password);

      //Assert
      await expect(loginPage.getLoginErrorMsg()).toContainText(
        "Invalid credentials",
      );
    });

    test("Verify user cannot login with invalid password", async ({
      loginPage,
    }) => {
      //Arrange
      const username = LoginData.invalidPassword.username;
      const password = LoginData.invalidPassword.password;

      //Act
      await loginPage.login(username, password);

      //Assert
      await expect(loginPage.getLoginErrorMsg()).toContainText(
        "Invalid credentials",
      );
    });

    test("Verify user cannot login with empty username", async ({
      loginPage,
    }) => {
      //Arrange
      const username = LoginData.emptyUsername.username;
      const password = LoginData.emptyUsername.password;

      //Act
      await loginPage.login(username, password);

      //Assert
      await expect(loginPage.getUsernameReqErrMsg()).toContainText("Required");
    });

    test("Verify user cannot login with empty password", async ({
      loginPage,
    }) => {
      //Arrange
      const username = LoginData.emptyPassword.username;
      const password = LoginData.emptyPassword.password;

      //Act
      await loginPage.login(username, password);

      //Assert
      await expect(loginPage.getPasswordReqErrMsg()).toContainText("Required");
    });
  });
});
