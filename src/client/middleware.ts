import type { Middleware } from "openapi-fetch";

export const authenticateRequestMiddleware: (apiKey: string) => Middleware = (apiKey: string) => {
  return {
    onRequest: async ({ request }) => {
      const newRequest = request.clone();
      newRequest.headers.set("x-api-key", apiKey);
      return newRequest;
    },
  };
};
