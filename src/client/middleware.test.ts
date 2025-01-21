import { expect, test } from "vitest";
import { authenticateRequestMiddleware } from "./middleware";

test("authenticateRequestMiddleware adds x-api-key header to request", async () => {
  const apiKey = "test-api-key";
  const middleware = authenticateRequestMiddleware(apiKey);

  const originalRequest = new Request("https://api.example.com/test", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  });


  expect(middleware.onRequest).toBeInstanceOf(Function);

  if (!middleware.onRequest) {
    throw new Error("onRequest handler not defined");
  }

  let modifiedRequest = await middleware.onRequest({
    request: originalRequest, schemaPath: "", params: {}, id: "", options: {
      baseUrl: "https://api.example.com",
      bodySerializer: JSON.stringify,
      fetch: globalThis.fetch,
      parseAs: "json",
      querySerializer: () => "",
    }
  });

  expect(modifiedRequest).toBeInstanceOf(Request);

  // cast modifiedRequest as Request to access headers
  modifiedRequest = modifiedRequest as Request;

  expect(modifiedRequest.headers.get("x-api-key")).toBe(apiKey);
  expect(modifiedRequest.headers.get("Content-Type")).toBe("application/json");
  expect(modifiedRequest).not.toBe(originalRequest); // Verify it's a clone
});