import { test, expect } from "@playwright/test";
import { createUserData } from "../../data/ApiTestData";
import { ApiClient } from "../../utils/ApiClient";
import { Logger } from "../../utils/Logger";
import { expectStatus } from "../../utils/apiAssertions";

test("Verify creating dynamic user", async ({ request }) => {
  const userData = createUserData();

  const apiClient = new ApiClient(request);
  const response = await apiClient.post("/users", userData);

  const jsonData = await response.json();

  Logger.info(JSON.stringify(jsonData, null, 2));
  expectStatus(response, 201);
  expect(jsonData.name).toEqual(userData.name);
  expect(jsonData.username).toEqual(userData.username);
  expect(jsonData.email).toEqual(userData.email);
});
