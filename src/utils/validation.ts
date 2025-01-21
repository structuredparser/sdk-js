import { PROJECT_ID_PLACEHOLDER } from ".";

export const ensureApiKeyIsValid = (apiKey: string) => {
  if (!apiKey || apiKey === "") {
    throw new Error("API key is required");
  }
}

export const ensureProjectIdIsValid = (projectId: string) => {
  if (!projectId || projectId === "") {
    throw new Error("Project ID is required");
  }
  if (projectId === PROJECT_ID_PLACEHOLDER) return true
  if (!projectId.startsWith("prj_")) {
    throw new Error("Project ID must start with 'prj_'");
  }
}

export const ensureBaseUrlIsValid = (baseUrl: string) => {
  // must be a valid url
  if (!baseUrl || baseUrl === "") {
    throw new Error("Base URL is required");
  }
  try {
    new URL(baseUrl);
  } catch (error) {
    throw new Error(`Base URL is invalid: ${JSON.stringify(error)}`);
  }
}