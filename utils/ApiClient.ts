import { APIRequestContext } from "@playwright/test";
import { env } from "../config/env";

export class ApiClient {
  constructor(private request: APIRequestContext) {}

  async get(endpoint: string) {
    return this.request.get(`${env.apiUrl}${endpoint}`);
  }

  async post(endpoint: string, data: Record<string, unknown>) {
    return this.request.post(`${env.apiUrl}${endpoint}`, { data });
  }

  async put(endpoint: string, data: Record<string, unknown>) {
    return this.request.put(`${env.apiUrl}${endpoint}`, { data });
  }

  async patch(endpoint: string, data: Record<string, unknown>) {
    return this.request.patch(`${env.apiUrl}${endpoint}`, { data });
  }

  async delete(endpoint: string) {
    return this.request.delete(`${env.apiUrl}${endpoint}`);
  }
}
