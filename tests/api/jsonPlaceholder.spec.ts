import { test, expect } from "@playwright/test";
import { Logger } from "../../utils/Logger";
import { ApiClient } from "../../utils/ApiClient";
import { expectProperty, expectStatus } from "../../utils/apiAssertions";

test.describe("Positive scenarios", () => {
  test("Verify GET /users/1 returns valid user details", async ({
    request,
  }) => {
    const apiClient = new ApiClient(request);
    const response = await apiClient.get(`/users/1`);

    expectStatus(response, 200);

    const jsonData = await response.json();
    Logger.info(JSON.stringify(jsonData, null, 2));

    expect(jsonData.name).toBe("Leanne Graham");
    expect(jsonData.id).toBe(1);
    expect(jsonData.username).toBe("Bret");
    expect(jsonData.email).toBe("Sincere@april.biz");
  });

  test("Verify user response structure", async ({ request }) => {
    const apiClient = new ApiClient(request);
    const response = await apiClient.get("/users/1");

    expectStatus(response, 200);

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
  test("Verify GET returns 404 for non-existing user", async ({ request }) => {
    const apiClient = new ApiClient(request);
    const response = await apiClient.get("/users/99999");
    Logger.info(`response.status : ${response.status()}`);

    const responseBody = await response.text();
    Logger.info(`responseBody : ${responseBody}`);

    expectStatus(response, 404);
  });
});
