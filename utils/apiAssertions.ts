import { APIResponse, expect } from "@playwright/test";

export function expectStatus(response: APIResponse, expectedStatus: number) {
  expect(response.status()).toBe(expectedStatus);
}

export function expectProperty(responseBody: object, property: string) {
  expect(responseBody).toHaveProperty(property);
}
