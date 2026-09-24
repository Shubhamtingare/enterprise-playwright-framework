import test, { expect } from "@playwright/test";
import { env } from "../../config/env";
import { Logger } from "../../utils/Logger";
import { ApiClient } from "../../utils/ApiClient";
import { expectStatus } from "../../utils/apiAssertions";

test.describe("Delete Posts API", () => {
  test("Verify DELETE removes a post", async ({ request }) => {
    const apiClient = new ApiClient(request);
    const response = await apiClient.delete("/posts/1");

    const jsonData = await response.json();

    Logger.info(JSON.stringify(jsonData, null, 2));
    expectStatus(response, 200);
    expect(jsonData).toEqual({});
  });

  test("Verify DELETE removes a non-existing post", async ({ request }) => {
    const response = await request.delete(`${env.apiUrl}/posts/999999`);

    const jsonData = await response.json();
    Logger.info(JSON.stringify(jsonData, null, 2));

    expectStatus(response, 200);
    expect(jsonData).toEqual({});
  });
});
