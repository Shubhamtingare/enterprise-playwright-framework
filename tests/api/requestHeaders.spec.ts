import test, { expect } from "@playwright/test";
import { Logger } from "../../utils/Logger";
import { env } from "../../config/env";

test("Verify GET request with custom headers", async ({ request }) => {
  const response = await request.get(`${env.apiUrl}/users/1`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const jsonData = await response.json();

  Logger.info(JSON.stringify(jsonData, null, 2));
  Logger.info(JSON.stringify(response.headers(), null, 2));

  expect(response.status()).toBe(200);
  expect(jsonData.name).toBe("Leanne Graham");
});
