import test, { expect } from "@playwright/test";
import { env } from "../../config/env";
import { getAuthHeaders } from "../../utils/authHeaders";
import { Logger } from "../../utils/Logger";

test("verify authorization using bearer token", async ({ request }) => {
  const dummyToken = "vcgsjj36823";
  const response = await request.get(`${env.apiUrl}/users/1`, {
    headers: getAuthHeaders(dummyToken),
  });

  const jsonData = await response.json();

  Logger.info(JSON.stringify(jsonData, null, 2));

  expect(response.status()).toBe(200);
  expect(jsonData).toHaveProperty("name");
});
