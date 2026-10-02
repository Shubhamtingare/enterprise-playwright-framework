import { test } from "../../fixtures/apiFixture";
import { expectStatus } from "../../utils/apiAssertions";

test("verify authenticated API", async ({ authenticatedApiClient }) => {
  const response = await authenticatedApiClient.get("/users/1");
  expectStatus(response, 200);
});
