import { describe, expect, test } from "vitest"
import { BaseClient } from "./base"
import { PROJECT_ID_PLACEHOLDER } from "../utils"

describe("Instantiate BaseClient", () => {

  test("with a valid API key", () => {
    expect(() => new BaseClient({ apiKey: "XUhFnkovSRaq4vsgjUB5kmKNU9k0aDHJmAFVEeHm" })).not.toThrow()
  })

  test("with an empty API key", () => {
    expect(() => new BaseClient({ apiKey: "" })).toThrow()
  })

  test("with a valid live base url", () => {
    expect(() => new BaseClient({ baseUrl: "https://api.structuredparser.com", apiKey: "XUhFnkovSRaq4vsgjUB5kmKNU9k0aDHJmAFVEeHm" })).not.toThrow()
  })

  test("with a valid local base url", () => {
    expect(() => new BaseClient({ baseUrl: "http://localhost:4949", apiKey: "XUhFnkovSRaq4vsgjUB5kmKNU9k0aDHJmAFVEeHm" })).not.toThrow()
  })

  test("with an empty base url", () => {
    expect(() => new BaseClient({ baseUrl: "", apiKey: "XUhFnkovSRaq4vsgjUB5kmKNU9k0aDHJmAFVEeHm" })).not.toThrow()
  })

  test("with an invalid base url", () => {
    expect(() => new BaseClient({ baseUrl: "invalid-url", apiKey: "XUhFnkovSRaq4vsgjUB5kmKNU9k0aDHJmAFVEeHm" })).toThrow()
  })

  test("with a valid project id", () => {
    expect(() => new BaseClient({ projectId: "prj_1asf234adf56789asf0", apiKey: "XUhFnkovSRaq4vsgjUB5kmKNU9k0aDHJmAFVEeHm" })).not.toThrow()
  })

  test("with the placeholder project id", () => {
    expect(() => new BaseClient({ projectId: PROJECT_ID_PLACEHOLDER, apiKey: "XUhFnkovSRaq4vsgjUB5kmKNU9k0aDHJmAFVEeHm" })).not.toThrow()
  })

  test("with an empty project ID", () => {
    expect(() => new BaseClient({ projectId: "", apiKey: "XUhFnkovSRaq4vsgjUB5kmKNU9k0aDHJmAFVEeHm" })).not.toThrow()
  })
})