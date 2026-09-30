import { expect } from "@playwright/test";
import { test } from "../../fixtures/apiFixture";
import { Logger } from "../../utils/Logger";
import { apiTestData } from "../../data/ApiTestData";
import { expectStatus } from "../../utils/apiAssertions";

test("Verify POST /posts creates a new post", async ({ apiClient }) => {
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
