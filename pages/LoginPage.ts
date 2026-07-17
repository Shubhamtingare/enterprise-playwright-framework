import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
  private readonly usernameInput;
  private readonly passwordInput;
  private readonly loginButton;
  private readonly forgotPasswordLink;

  async enterUsername(username: string): Promise<void> {}
  async enterPassword(passowrd: string): Promise<void> {}
  async clickLogin() {}
  async clickForgotPassword() {}

  async login(username: string, password: string): Promise<void> {}
}
