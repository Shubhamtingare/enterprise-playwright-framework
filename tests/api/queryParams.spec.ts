import { test, expect } from "@playwright/test";
import { env } from "../../config/env";
import { Logger } from "../../utils/Logger";
import { ApiClient } from "../../utils/ApiClient";

test.describe("Path and Query parameters API", () => {
  test("Verify GET user using path parameter", async ({ request }) => {
    const apiClient = new ApiClient(request);
    const response = await apiClient.get("/users/1");

    const jsonData = await response.json();

    Logger.info(JSON.stringify(jsonData, null, 2));

    expect(response.status()).toBe(200);
    expect(jsonData).toHaveProperty("name");
  });

  test("Verify GET user using query parameter", async ({ request }) => {
    const response = await request.get(`${env.apiUrl}/posts`, {
      params: {
        userId: 1,
      },
    });

    const jsonData = await response.json();

    Logger.info(JSON.stringify(jsonData, null, 2));

    expect(response.status()).toBe(200);
    expect(jsonData).toBeInstanceOf(Array);
    expect(jsonData.length).toBeGreaterThan(0);

    for (const post of jsonData) {
      expect(post.userId).toBe(1);
    }
  });
});
