import { APIRequestContext, APIResponse } from "@playwright/test";
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

  private async executeRequest(
    method: string,
    url: string,
    requestFn: () => Promise<APIResponse>,
  ) {
    try {
      const response = await requestFn();
      return new ApiResponse(response);
    } catch (error) {
      throw new Error(`API Request failed:${method} ${url} \n ${error}`);
    }
  }

  async get(endpoint: string, options?: RequestOptions) {
    const url = `${env.apiUrl}${endpoint}`;

    return this.executeRequest("GET", url, () =>
      this.request.get(url, this.buildRequestOptions(options)),
    );
  }

  async post(
    endpoint: string,
    data: Record<string, unknown>,
    options?: RequestOptions,
  ) {
    const url = `${env.apiUrl}${endpoint}`;

    return this.executeRequest("POST", url, () =>
      this.request.post(url, {
        data,
        ...this.buildRequestOptions(options),
      }),
    );
  }

  async put(
    endpoint: string,
    data: Record<string, unknown>,
    options?: RequestOptions,
  ) {
    const url = `${env.apiUrl}${endpoint}`;

    return this.executeRequest("PUT", url, () =>
      this.request.put(url, {
        data,
        ...this.buildRequestOptions(options),
      }),
    );
  }

  async patch(
    endpoint: string,
    data: Record<string, unknown>,
    options?: RequestOptions,
  ) {
    const url = `${env.apiUrl}${endpoint}`;

    return this.executeRequest("PATCH", url, () =>
      this.request.patch(url, {
        data,
        ...this.buildRequestOptions(options),
      }),
    );
  }

  async delete(endpoint: string, options?: RequestOptions) {
    const url = `${env.apiUrl}${endpoint}`;

    return this.executeRequest("DELETE", url, () =>
      this.request.delete(url, {
        ...this.buildRequestOptions(options),
      }),
    );
  }
}
