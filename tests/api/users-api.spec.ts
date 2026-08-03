import { test, expect } from "@playwright/test";

test("Get Users API", async ({ request }) => {
  const response = await request.get("https://reqres.in/api/users?page=2", {
    headers: {
      "x-api-key": "free_user_3HGxmaLGQJ129iIwthR4rD7iffT",
    },
  });

  expect(response.status()).toBe(200);
});
