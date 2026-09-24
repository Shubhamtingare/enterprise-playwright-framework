import test, { expect } from "@playwright/test";
import { Logger } from "../../utils/Logger";
import { ApiClient } from "../../utils/ApiClient";
import { apiTestData } from "../../data/ApiTestData";
import { expectStatus } from "../../utils/apiAssertions";

test("Verify POST /posts creates a new post", async ({ request }) => {
  const apiClient = new ApiClient(request);

  const response = await apiClient.post("/posts", apiTestData.createPost, {
    headers: {
      Accept: "application/json",
    },
  });

  const jsonData = await response.json();
  Logger.info(JSON.stringify(jsonData, null, 2));

  expectStatus(response, 201);
  expect(jsonData.title).toBe("Playwright");
  expect(jsonData.body).toBe("Learning API Testing");
  expect(jsonData.userId).toBe(1);
});
