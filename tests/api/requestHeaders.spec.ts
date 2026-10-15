import { test } from "../../fixtures/apiFixture";
import { Logger } from "../../utils/Logger";
import { expectPropertyValue, expectStatus } from "../../utils/apiAssertions";

test("Verify GET request with custom headers", async ({ apiClient }) => {
  const response = await apiClient.get(`/users/1`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const jsonData = await response.json();

  Logger.info(JSON.stringify(jsonData, null, 2));
  Logger.info(JSON.stringify(response.headers(), null, 2));

  expectStatus(response, 200);
  expectPropertyValue(jsonData, "name", "Leanne Graham");
});
