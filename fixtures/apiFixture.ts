import { test as base } from "@playwright/test";
import { ApiClient } from "../utils/ApiClient";
import { env } from "../config/env";
import { getAuthHeaders } from "../utils/authHeaders";

export const test = base.extend<{
  apiClient: ApiClient;
  authenticatedApiClient: ApiClient;
}>({
  apiClient: async ({ request }, use) => {
    await use(new ApiClient(request));
  },
  authenticatedApiClient: async ({ request }, use) => {
    const apiClient = new ApiClient(request, {
      headers: getAuthHeaders(env.apiToken),
    });
    await use(apiClient);
  },
});
