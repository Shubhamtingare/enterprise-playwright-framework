import { expect } from "@playwright/test";
import { test } from "../../fixtures/baseFixture";

test("Verify that an authenticated user can view the Dashboard", async ({
  page,
  dashboardPage,
}) => {
  await page.goto("/");
  await expect(dashboardPage.getDashboardHeading()).toContainText("Dashboard");
});
