import { BasePage } from "./BasePage";

export class DashboardPage extends BasePage {
  private readonly dashboardHeading = this.page.locator(
    ".oxd-topbar-header-breadcrumb-module",
  );

  verifyDashboardHeading() {
    return this.dashboardHeading;
  }
}
