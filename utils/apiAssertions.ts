import { APIResponse, expect } from "@playwright/test";

export function expectStatus(response: APIResponse, expectedStatus: number) {
  expect(response.status()).toBe(expectedStatus);
}
