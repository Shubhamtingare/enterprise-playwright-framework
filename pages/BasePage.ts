import { Page } from "@playwright/test";

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  async navigate(url: string) {
    await this.page.goto(url);
  }
  async getTitle() {
    return await this.page.title();
  }
  async reload() {
    await this.page.reload();
  }
  async goBack() {
    await this.page.goBack();
  }
  async goForward() {
    await this.page.goForward();
  }
  async waitForLoadState() {
    await this.page.waitForLoadState("networkidle");
  }
}
