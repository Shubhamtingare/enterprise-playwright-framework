import { APIRequestContext } from "@playwright/test";
import { env } from "../config/env";

type RequestOptions = {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  timeout?: number;
};

export class ApiClient {
  constructor(
    private request: APIRequestContext,
    private defaultOptions?: RequestOptions,
  ) {}

  async get(endpoint: string, options?: RequestOptions) {
    return this.request.get(`${env.apiUrl}${endpoint}`, {
      ...this.defaultOptions,
      ...options,
    });
  }

  async post(
    endpoint: string,
    data: Record<string, unknown>,
    options?: RequestOptions,
  ) {
    return this.request.post(`${env.apiUrl}${endpoint}`, {
      ...this.defaultOptions,
      ...options,
    });
  }

  async put(
    endpoint: string,
    data: Record<string, unknown>,
    options?: RequestOptions,
  ) {
    return this.request.put(`${env.apiUrl}${endpoint}`, {
      ...this.defaultOptions,
      ...options,
    });
  }

  async patch(
    endpoint: string,
    data: Record<string, unknown>,
    options?: RequestOptions,
  ) {
    return this.request.patch(`${env.apiUrl}${endpoint}`, {
      ...this.defaultOptions,
      ...options,
    });
  }

  async delete(endpoint: string, options?: RequestOptions) {
    return this.request.delete(`${env.apiUrl}${endpoint}`, {
      ...this.defaultOptions,
      ...options,
    });
  }
}
