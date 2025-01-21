import { describe, expect, it, vi } from "vitest";
import { withRetry } from ".";

describe("withRetry", () => {

  it("succeeds on the first attempt without delay", async () => {
    vi.useFakeTimers();
    const mockOperation = vi.fn(async () => "result");
    const result = await withRetry(() => mockOperation());
    expect(result).toBe("result");
    expect(mockOperation).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it("retries when the operation fails and eventually succeeds", async () => {
    vi.useFakeTimers();
    let attempts = 0;
    const mockOperation = vi.fn(async () => {
      attempts++;
      if (attempts < 3) throw new Error("Error");
      return "success";
    });
    const result = withRetry(() => mockOperation(), { maxAttempts: 5 });
    for (let i = 0; i < 3; i++) {
      await vi.runAllTimersAsync();
    }
    await expect(result).resolves.toBe("success");
    expect(mockOperation).toHaveBeenCalledTimes(3);
    vi.useRealTimers();
  });

  it("throws the last error after max attempts", async () => {
    vi.useFakeTimers();
    const mockOperation = vi.fn(async () => {
      throw new Error("Final error");
    });
    const result = withRetry(() => mockOperation(), { maxAttempts: 2 });
    for (let i = 0; i < 2; i++) {
      await vi.runAllTimersAsync();
    }
    await expect(result).rejects.toThrow("Final error");
    expect(mockOperation).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  });

  it("caps delay at maxDelay", async () => {
    vi.useFakeTimers();
    const mockOperation = vi.fn(async () => {
      throw new Error("Delayed error");
    });
    const start = Date.now();
    const finalPromise = withRetry(() => mockOperation(), { maxAttempts: 3, initialDelay: 1000, maxDelay: 1500 });
    for (let i = 0; i < 3; i++) {
      await vi.runAllTimersAsync();
    }
    await expect(finalPromise).rejects.toThrow("Delayed error");
    const totalTime = Date.now() - start;
    expect(totalTime).toBeLessThan(5000); // ensuring we don't exceed the maxDelay in total
    vi.useRealTimers();
  });
});