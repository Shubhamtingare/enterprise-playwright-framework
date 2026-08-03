import { test, expect } from "@playwright/test";
import { Logger } from "../../utils/Logger.ts";

test("Verify GET /users/1 returns valid user details", async ({ request }) => {
  const response = await request.get(
    "https://jsonplaceholder.typicode.com/users/1",
  );

  expect(response.status()).toBe(200);

  const jsonData = await response.json();
  Logger.info(JSON.stringify(jsonData, null, 2));

  expect(jsonData.name).toBe("Leanne Graham");
  expect(jsonData.id).toBe(1);
  expect(jsonData.username).toBe("Bret");
  expect(jsonData.email).toBe("Sincere@april.biz");
});

test("Verify user response structure", async ({ request }) => {
  const response = await request.get(
    "https://jsonplaceholder.typicode.com/users/1",
  );

  expect(response.status()).toBe(200);

  const jsonData = await response.json();
  Logger.info(JSON.stringify(jsonData, null, 2));

  expect(jsonData).toHaveProperty("id");
  expect(jsonData).toHaveProperty("name");
  expect(jsonData).toHaveProperty("email");
  expect(jsonData).toHaveProperty("username");
  expect(jsonData).toHaveProperty("address");
  expect(jsonData).toHaveProperty("company");

  expect(jsonData.address).toHaveProperty("city");
  expect(jsonData.company).toHaveProperty("name");
  expect(jsonData.address.geo).toHaveProperty("lat");
});
