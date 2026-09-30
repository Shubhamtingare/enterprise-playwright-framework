import { expect } from "@playwright/test";
import { test } from "../../fixtures/apiFixture";
import { createUserData } from "../../data/ApiTestData";
import { Logger } from "../../utils/Logger";
import { expectStatus } from "../../utils/apiAssertions";

test("Verify creating dynamic user", async ({ apiClient }) => {
  const userData = createUserData();

  const response = await apiClient.post("/users", userData);

  const jsonData = await response.json();

  Logger.info(JSON.stringify(jsonData, null, 2));
  expectStatus(response, 201);
  expect(jsonData.name).toEqual(userData.name);
  expect(jsonData.username).toEqual(userData.username);
  expect(jsonData.email).toEqual(userData.email);
});
