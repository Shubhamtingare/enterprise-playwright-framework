import { test } from "../../fixtures/apiFixture";
import { Logger } from "../../utils/Logger";
import {
  expectPropertyType,
  expectProperty,
  expectPropertyValue,
  expectStatus,
  expectErrorBody,
  expectResponseTime,
  expectHeader,
  expectHeaderExists,
} from "../../utils/apiAssertions";
import { validateSchema } from "../../utils/schemaValidator";
import { userSchema } from "../../schemas/userSchema";
import { performanceConfig } from "../../config/performanceConfig";
import { ApiResponse } from "../../utils/ApiResponse";

test.describe("Positive scenarios", () => {
  test(
    "Verify GET /users/1 returns valid user details",
    {
      // tag: ["@regression", "@smoke"],
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
      // tag: "@regression",
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
      expectProperty(jsonData, "address.city");
      expectProperty(jsonData, "company.name");
      expectProperty(jsonData, "address.geo.lat");
    },
  );

  test("Verify response headers", async ({ apiClient }) => {
    const response = await apiClient.get("/users/1");

    const headers = response.headers();

    expectStatus(response, 200);
    expectHeaderExists(headers, "content-type");
    expectHeaderExists(headers, "cache-control");
    expectHeader(headers, "content-type", "application/json; charset=utf-8");

    Logger.info(`Response headers : ${JSON.stringify(headers, null, 2)}`);
    Logger.info(
      `Content-Type : ${JSON.stringify(headers["content-type"], null, 2)}`,
    );
  });
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
      const jsonData = await response.json();
      expectErrorBody(jsonData);
    },
  );

  test("/posts", async ({ apiClient }) => {
    const response = await apiClient.post("/posts", {
      title: "Playwright",
      body: "Learning API Testing",
      userId: "1",
    });

    expectStatus(response, 201);

    const responseBody = await response.json();

    expectPropertyValue(responseBody, "title", "Playwright");
    expectPropertyValue(responseBody, "userId", "1");
    expectProperty(responseBody, "id");
  });

  //It should be fail--
  // test("Verify missing response header", async ({ apiClient }) => {
  //   const response = await apiClient.get("/users/1");
  //   const headers = response.headers();

  //   expectHeaderExists(headers, "invalid-header");
  // });
});

test.describe("API Response time validation tests", () => {
  test("Validate API response time", async ({ apiClient }) => {
    const startTime = performance.now();
    const response = await apiClient.get("/users/1");
    const endTime = performance.now();
    const responseTime = endTime - startTime;

    expectStatus(response, 200);
    Logger.info(`API Response Time: ${responseTime.toFixed(2)} ms`);
    expectResponseTime(
      responseTime,
      performanceConfig.maxApiResponseTime,
      "GET /users/1",
    );
  });
});
