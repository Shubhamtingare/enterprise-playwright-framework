import { APIRequestContext } from "@playwright/test";
import { env } from "../config/env";
import { ApiResponse } from "./ApiResponse";

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

  private buildRequestOptions(options?: RequestOptions): RequestOptions {
    return {
      ...this.defaultOptions,
      ...options,
      headers: {
        ...this.defaultOptions?.headers,
        ...options?.headers,
      },
    };
  }

  async get(endpoint: string, options?: RequestOptions) {
    const response = await this.request.get(
      `${env.apiUrl}${endpoint}`,
      this.buildRequestOptions(options),
    );
    return new ApiResponse(response);
  }

  async post(
    endpoint: string,
    data: Record<string, unknown>,
    options?: RequestOptions,
  ) {
    const response = await this.request.post(`${env.apiUrl}${endpoint}`, {
      data,
      ...this.buildRequestOptions(options),
    });
    return new ApiResponse(response);
  }

  async put(
    endpoint: string,
    data: Record<string, unknown>,
    options?: RequestOptions,
  ) {
    const response = await this.request.put(`${env.apiUrl}${endpoint}`, {
      data,
      ...this.buildRequestOptions(options),
    });

    return new ApiResponse(response);
  }

  async patch(
    endpoint: string,
    data: Record<string, unknown>,
    options?: RequestOptions,
  ) {
    const response = await this.request.patch(`${env.apiUrl}${endpoint}`, {
      data,
      ...this.buildRequestOptions(options),
    });

    return new ApiResponse(response);
  }

  async delete(endpoint: string, options?: RequestOptions) {
    const response = await this.request.delete(`${env.apiUrl}${endpoint}`, {
      ...this.buildRequestOptions(options),
    });

    return new ApiResponse(response);
  }
}
