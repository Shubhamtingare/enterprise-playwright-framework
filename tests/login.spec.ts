import { test } from "../fixtures/baseFixture";
import { expect } from "@playwright/test";
import { LoginData } from "../data/LoginData";

test.beforeEach("Navigate to correct URL", async ({ page }) => {
  await page.goto("/");
});

test.describe("OrangeHRM Login", () => {
  test.describe("Positive scenarios @smoke @regression", () => {
    test("Verify user can login with valid credentials", async ({
      authenticatedDashboard,
    }) => {
      //Assert
      await expect(authenticatedDashboard.getDashboardHeading()).toContainText(
        "Dashboard",
      );
    });
  });

  test.describe("Negative scenarios", () => {
    test("Verify user cannot login with invalid username @regression", async ({
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

    test("Verify user cannot login with invalid password @regression", async ({
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

    test("Verify user cannot login with empty username @regression", async ({
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

    test("Verify user cannot login with empty password @regression", async ({
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
