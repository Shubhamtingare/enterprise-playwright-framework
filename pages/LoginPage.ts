import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  private readonly usernameInput = this.page.getByPlaceholder("Username");
  private readonly passwordInput = this.page.getByPlaceholder("Password");
  private readonly loginButton = this.page.getByRole("button", {
    name: "Login",
  });
  private readonly forgotPasswordLink = this.page.locator(
    ".orangehrm-login-forgot-header",
  );
  private readonly loginError = this.page.locator(".oxd-alert-content--error");
  private readonly usernameRequiredError = this.page
    .locator(".oxd-input-field-error-message")
    .nth(0);
  private readonly passwordRequiredError = this.page
    .locator(".oxd-input-field-error-message")
    .nth(0);

  constructor(page: Page) {
    super(page);
  }

  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }
  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }
  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }
  async clickForgotPassword(): Promise<void> {
    await this.forgotPasswordLink.click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }
  getLoginErrorMsg() {
    return this.loginError;
  }
  getUsernameReqErrMsg() {
    return this.usernameRequiredError;
  }
  getPasswordReqErrMsg() {
    return this.passwordRequiredError;
  }
}
