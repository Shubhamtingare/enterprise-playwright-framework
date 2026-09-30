import { test as base } from "@playwright/test";
import { ApiClient } from "../utils/ApiClient";

export const test = base.extend<{
  apiClient: ApiClient;
}>({
  apiClient: async ({ request }, use) => {
    await use(new ApiClient(request));
  },
});
