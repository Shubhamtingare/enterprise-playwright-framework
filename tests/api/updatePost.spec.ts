import test, { expect } from "@playwright/test";
import { Logger } from "../../utils/Logger";
import { env } from "../../config/env";
import { ApiClient } from "../../utils/ApiClient";

test.describe("Update API", () => {
  test("Verify PUT updates an existing post", async ({ request }) => {
    const data = {
      id: 1,
      title: "Updated Playwright",
      body: "Updated API Testing",
      userId: 1,
    };
    const apiClient = new ApiClient(request);
    const response = await apiClient.put("/posts/1", data);

    const jsonData = await response.json();
    Logger.info(JSON.stringify(jsonData, null, 2));

    expect(response.status()).toBe(200);
    expect(jsonData.title).toBe("Updated Playwright");
    expect(jsonData.body).toBe("Updated API Testing");
    expect(jsonData.userId).toBe(1);
  });

  test("Verify PATCH updates post title", async ({ request }) => {
    const apiClient = new ApiClient(request);
    const data = {
      title: "Patched Playwright",
    };
    const response = await apiClient.patch("/posts/1", data);

    const jsonData = await response.json();
    Logger.info(JSON.stringify(jsonData, null, 2));

    expect(response.status()).toBe(200);
    expect(jsonData.title).toBe("Patched Playwright");
    expect(jsonData).toHaveProperty("id");
  });
});
