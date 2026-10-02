import { test } from "../../fixtures/apiFixture";
import { expectStatus } from "../../utils/apiAssertions";

test("verify authenticated API", async ({ authenticatedApiClient }) => {
  const response = await authenticatedApiClient.get("/users/1");
  expectStatus(response, 200);
});

test("Verify authenticated API with additional headers", async ({
  authenticatedApiClient,
}) => {
  const response = await authenticatedApiClient.get("/users/1", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  expectStatus(response, 200);
});
