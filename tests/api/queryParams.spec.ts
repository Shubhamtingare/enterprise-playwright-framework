import { expect } from "@playwright/test";
import { test } from "../../fixtures/apiFixture";
import { Logger } from "../../utils/Logger";
import { expectStatus } from "../../utils/apiAssertions";

test.describe("Path and Query parameters API", () => {
  test("Verify GET user using path parameter", async ({ apiClient }) => {
    const response = await apiClient.get("/users/1");

    const jsonData = await response.json();

    Logger.info(JSON.stringify(jsonData, null, 2));

    expectStatus(response, 200);
    expect(jsonData).toHaveProperty("name");
  });

  test("Verify GET user using query parameter", async ({ apiClient }) => {
    const response = await apiClient.get(`/posts`, {
      params: {
        userId: 1,
      },
    });

    const jsonData = await response.json();

    Logger.info(JSON.stringify(jsonData, null, 2));

    expectStatus(response, 200);
    expect(jsonData).toBeInstanceOf(Array);
    expect(jsonData.length).toBeGreaterThan(0);

    for (const post of jsonData) {
      expect(post.userId).toBe(1);
    }
  });
});
