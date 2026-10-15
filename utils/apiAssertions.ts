import { expect } from "@playwright/test";
import { ApiResponse } from "./ApiResponse";

export function expectStatus(response: ApiResponse, expectedStatus: number) {
  expect(response.status()).toBe(expectedStatus);
}

export function expectProperty(responseBody: object, property: string) {
  expect(responseBody).toHaveProperty(property);
}

export function expectPropertyValue(
  responseBody: object,
  property: string,
  propertyValue: unknown,
) {
  expect((responseBody as Record<string, unknown>)[property]).toBe(
    propertyValue,
  );
}
