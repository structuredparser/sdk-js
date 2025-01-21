import { describe, test, expect } from "vitest";
import { StructuredParser } from "./sdk";
import { Ledger } from "./ledger";
import { Documents } from "./documents";
import { Start } from "./start";

describe("Instantiate StructuredParser", () => {

  test("with valid options", () => {
    expect(() => new StructuredParser({ apiKey: "my-api-key" })).toBeDefined()
  })

  test("modules are properly defined and instantiated", () => {
    const parser = new StructuredParser({ apiKey: "my-api-key" })
    expect(parser.ledger).toBeInstanceOf(Ledger)
    expect(parser.documents).toBeInstanceOf(Documents)
    expect(parser.start).toBeInstanceOf(Start)
  })

  describe("StructuredParser.fromApiKey", () => {
    test("should create a new StructuredParser instance with the provided api key", () => {
      const parser = StructuredParser.fromApiKey("my-api-key");
      expect(parser).toBeInstanceOf(StructuredParser);
      expect(parser.ledger).toBeInstanceOf(Ledger);
      expect(parser.documents).toBeInstanceOf(Documents);
      expect(parser.start).toBeInstanceOf(Start);
    });
  });
})
