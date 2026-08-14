import test, { expect } from "@playwright/test";
import { Logger } from "../../utils/Logger";
import { ApiClient } from "../../utils/ApiClient";

test("Verify POST /posts creates a new user", async ({ request }) => {
  const apiClient = new ApiClient(request);
  const data = {
    title: "Playwright",
    body: "Learning API Testing",
    userId: 1,
  };
  const response = await apiClient.post("/posts", data);

  const jsonData = await response.json();
  Logger.info(JSON.stringify(jsonData, null, 2));

  expect(response.status()).toBe(201);
  expect(jsonData.title).toBe("Playwright");
  expect(jsonData.body).toBe("Learning API Testing");
  expect(jsonData.userId).toBe(1);
});
