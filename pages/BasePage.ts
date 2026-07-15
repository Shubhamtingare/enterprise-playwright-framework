import { Page } from "@playwright/test";

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  //navigation
  async navigate(url: string) {
    await this.page.goto(url);
  }

  //information
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  //browser navigation
  async reload() {
    await this.page.reload();
  }
  async goBack() {
    await this.page.goBack();
  }
  async goForward() {
    await this.page.goForward();
  }

  //waiting
  async waitForPageLoad() {
    await this.page.waitForLoadState("networkidle");
  }
}
