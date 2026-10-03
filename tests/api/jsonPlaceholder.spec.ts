import { test } from "../../fixtures/apiFixture";
import { Logger } from "../../utils/Logger";
import { expectProperty, expectStatus } from "../../utils/apiAssertions";
import { validateSchema } from "../../utils/schemaValidator";
import { userSchema } from "../../schemas/userSchema";

test.describe("Positive scenarios", () => {
  test("Verify GET /users/1 returns valid user details", async ({
    apiClient,
  }) => {
    const response = await apiClient.get(`/users/1`);
    // const response = new ApiResponse(rawResponse);

    expectStatus(response, 200);

    const jsonData = await response.json();
    Logger.info(JSON.stringify(jsonData, null, 2));

    validateSchema(jsonData, userSchema);
  });

  test("Verify user response structure", async ({ apiClient }) => {
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
  });
});

test.describe("Negative scenarios", () => {
  test("Verify GET returns 404 for non-existing user", async ({
    apiClient,
  }) => {
    const response = await apiClient.get("/users/99999");
    Logger.info(`response.status : ${response.status()}`);

    const responseBody = await response.text();
    Logger.info(`responseBody : ${responseBody}`);

    expectStatus(response, 404);
  });
});
