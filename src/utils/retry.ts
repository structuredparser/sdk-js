export type RetryConfiguration = {
  maxAttempts: number;
  initialDelay: number;
  maxDelay: number;
};

export async function withRetry<T>(operation: () => Promise<T>, config: Partial<RetryConfiguration> = {}): Promise<T> {

  const {
    maxAttempts = 3,
    initialDelay = 1000,
    maxDelay = 5000,
  } = config;

  let lastError: Error = new Error("Operation failed");
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      if (attempt === maxAttempts - 1) break;

      const delay = Math.min(initialDelay * 2 ** attempt, maxDelay);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw lastError;
}
