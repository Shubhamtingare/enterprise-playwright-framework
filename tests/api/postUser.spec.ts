import test, { expect } from "@playwright/test";
import { Logger } from "../../utils/Logger";
import { env } from "../../config/env";

test("Verify POST /users creates a new user", async ({ request }) => {
  const appUrl = `${env.apiUrl}/posts`;
  const response = await request.post(appUrl, {
    data: {
      title: "Playwright",
      body: "Learning API Testing",
      userId: 1,
    },
  });

  const jsonData = await response.json();
  Logger.info(JSON.stringify(jsonData, null, 2));

  expect(response.status()).toBe(201);
  expect(jsonData.title).toBe("Playwright");
  expect(jsonData.body).toBe("Learning API Testing");
  expect(jsonData.userId).toBe(1);
});
