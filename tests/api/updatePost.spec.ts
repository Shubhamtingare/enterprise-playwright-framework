import test, { expect } from "@playwright/test";
import { Logger } from "../../utils/Logger";
import { env } from "../../config/env";

test.describe("Update API", () => {
  test("Verify PUT updates an existing post", async ({ request }) => {
    const response = await request.put(`${env.apiUrl}/posts/1`, {
      data: {
        id: 1,
        title: "Updated Playwright",
        body: "Updated API Testing",
        userId: 1,
      },
    });

    const jsonData = await response.json();
    Logger.info(JSON.stringify(jsonData, null, 2));

    expect(response.status()).toBe(200);
    expect(jsonData.title).toBe("Updated Playwright");
    expect(jsonData.body).toBe("Updated API Testing");
    expect(jsonData.userId).toBe(1);
  });

  test("Verify PATCH updates post title", async ({ request }) => {
    const response = await request.patch(`${env.apiUrl}/posts/1`, {
      data: {
        title: "Patched Playwright",
      },
    });

    const jsonData = await response.json();
    Logger.info(JSON.stringify(jsonData, null, 2));

    expect(response.status()).toBe(200);
    expect(jsonData.title).toBe("Patched Playwright");
    expect(jsonData).toHaveProperty("id");
  });
});
