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

export function expectPropertyType(
  responseBody: object,
  property: string,
  propertyType: string,
) {
  expect(typeof (responseBody as Record<string, unknown>)[property]).toBe(
    propertyType,
  );
}

export function expectErrorBody(responseBody: object) {
  expect(responseBody).toEqual({});
}

export function expectResponseTime(
  responseTime: number,
  maxTime: number,
  apiName: string,
) {
  expect(
    responseTime,
    `${apiName} exceeded the maximum response time.
     Expected: <= ${maxTime} ms
     Actual: ${responseTime.toFixed(2)} ms`,
  ).toBeLessThanOrEqual(maxTime);
}

export function expectHeader(
  headers: object,
  headerName: string,
  expectedValue: string,
) {
  const actualValue = (headers as Record<string, string>)[headerName];
  expect(actualValue).toBe(expectedValue);
}

export function expectHeaderExists(headers: object, headerName: string) {
  expect(headers).toHaveProperty(headerName);
}
