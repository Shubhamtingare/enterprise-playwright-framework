import { APIResponse } from "@playwright/test";

export class ApiResponse {
  constructor(private response: APIResponse) {}

  status(): number {
    return this.response.status();
  }

  headers(): Record<string, string> {
    return this.response.headers();
  }

  async json(): Promise<object> {
    return this.response.json();
  }

  async text(): Promise<string> {
    return this.response.text();
  }
}
