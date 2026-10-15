import { test } from "../../fixtures/apiFixture";
import { Logger } from "../../utils/Logger";
import {
  expectPropertType,
  expectProperty,
  expectPropertyValue,
  expectStatus,
} from "../../utils/apiAssertions";
import { validateSchema } from "../../utils/schemaValidator";
import { userSchema } from "../../schemas/userSchema";

test.describe("Positive scenarios", () => {
  test(
    "Verify GET /users/1 returns valid user details",
    {
      tag: ["@regression", "@smoke"],
    },
    async ({ apiClient }) => {
      const response = await apiClient.get(`/users/1`);

      expectStatus(response, 200);

      const jsonData = await response.json();
      Logger.info(JSON.stringify(jsonData, null, 2));

      expectPropertyValue(jsonData, "id", 1);
      expectPropertyValue(jsonData, "name", "Leanne Graham");
      expectPropertyValue(jsonData, "username", "Bret");
      expectPropertyValue(jsonData, "email", "Sincere@april.biz");
      expectPropertyType(jsonData, "id", "number");
      expectPropertyType(jsonData, "name", "string");
      expectPropertyType(jsonData, "email", "string");

      validateSchema(jsonData, userSchema);
    },
  );

  test(
    "Verify user response structure",
    {
      tag: "@regression",
    },
    async ({ apiClient }) => {
      const response = await apiClient.get("/users/1");

      const jsonData = await response.json();
      Logger.info(JSON.stringify(jsonData, null, 2));

      expectProperty(jsonData, "id");
      expectProperty(jsonData, "name");
      expectProperty(jsonData, "email");
      expectProperty(jsonData, "username");
      expectProperty(jsonData, "address");
      expectProperty(jsonData, "company");
      expectProperty(jsonData.address, "city");
      expectProperty(jsonData.company, "name");
      expectProperty(jsonData.address.geo, "lat");
    },
  );
});

test.describe("Negative scenarios", () => {
  test(
    "Verify GET returns 404 for non-existing user",
    {
      tag: "@regression",
    },
    async ({ apiClient }) => {
      const response = await apiClient.get("/users/99999");
      Logger.info(`response.status : ${response.status()}`);

      expectStatus(response, 404);
      const responseBody = await response.text();
      Logger.info(`responseBody : ${responseBody}`);
    },
  );
});
