export const PROJECT_ID_PLACEHOLDER = "__AUTO__"

export const asyncSleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export * from "./retry"