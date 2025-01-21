import createClient, { type Client } from "openapi-fetch";
import type { paths } from "../openapi";
import { PROJECT_ID_PLACEHOLDER, type RetryConfiguration, withRetry } from "../utils";
import {
  ensureApiKeyIsValid,
  ensureBaseUrlIsValid,
  ensureProjectIdIsValid,
} from "../utils/validation";
import {
  authenticateRequestMiddleware,
} from "./middleware";

export type BaseClientOptions = {
  apiKey: string;
  projectId?: string;
  baseUrl?: string;
  fetch?: typeof globalThis.fetch;
  retries?: RetryConfiguration;
};

export class BaseClient {
  protected client: Client<paths>;
  protected projectId: string;
  protected retryConfig?: RetryConfiguration;

  constructor(options: BaseClientOptions) {
    const baseUrl = options.baseUrl || "https://api.structuredparser.com";
    const fetch = options.fetch || globalThis.fetch;
    const apiKey = options.apiKey;
    const projectId = options.projectId || PROJECT_ID_PLACEHOLDER;

    ensureApiKeyIsValid(apiKey);
    ensureBaseUrlIsValid(baseUrl);
    ensureProjectIdIsValid(projectId);

    this.projectId = projectId;
    this.retryConfig = options.retries;
    this.client = createClient<paths>({ baseUrl, fetch });
    this.client.use(authenticateRequestMiddleware(apiKey));
  }

  protected async handleResponseOrThrow<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(`Error: ${errorBody.message}`);
    }
    return response.json();
  }

  protected async withRetry<T>(fn: () => Promise<T>, config: RetryConfiguration | undefined = this.retryConfig): Promise<T> {
    return withRetry(fn, config)
  }
}
