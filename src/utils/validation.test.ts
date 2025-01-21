import { test, expect, describe } from "vitest"
import { ensureApiKeyIsValid, ensureProjectIdIsValid, ensureBaseUrlIsValid } from "./validation"
import { PROJECT_ID_PLACEHOLDER } from "."

describe("validation", () => {


  test("ensureApiKeyIsValid: throws if missing or empty", () => {
    expect(() => ensureApiKeyIsValid("")).toThrow("API key is required")
    expect(() => ensureApiKeyIsValid(undefined as unknown as string)).toThrow("API key is required")
  })

  test("ensureApiKeyIsValid: does not throw if valid", () => {
    expect(() => ensureApiKeyIsValid("some-api-key")).not.toThrow()
  })

  test("ensureProjectIdIsValid: throws if missing or empty", () => {
    expect(() => ensureProjectIdIsValid("")).toThrow("Project ID is required")
    expect(() => ensureProjectIdIsValid(undefined as unknown as string)).toThrow("Project ID is required")
  })

  test("ensureProjectIdIsValid: returns true if PROJECT_ID_PLACEHOLDER", () => {
    expect(ensureProjectIdIsValid(PROJECT_ID_PLACEHOLDER)).toBe(true)
  })

  test("ensureProjectIdIsValid: throws if not starting with 'prj_'", () => {
    expect(() => ensureProjectIdIsValid("abc_123")).toThrow("Project ID must start with 'prj_'")
  })

  test("ensureProjectIdIsValid: does not throw if valid", () => {
    expect(() => ensureProjectIdIsValid("prj_123")).not.toThrow()
  })

  test("ensureBaseUrlIsValid: throws if missing or empty", () => {
    expect(() => ensureBaseUrlIsValid("")).toThrow("Base URL is required")
    expect(() => ensureBaseUrlIsValid(undefined as unknown as string)).toThrow("Base URL is required")
  })

  test("ensureBaseUrlIsValid: throws if invalid", () => {
    expect(() => ensureBaseUrlIsValid("not-a-valid-url")).toThrow()
  })

  test("ensureBaseUrlIsValid: does not throw if valid", () => {
    expect(() => ensureBaseUrlIsValid("https://example.com")).not.toThrow()
  })

})