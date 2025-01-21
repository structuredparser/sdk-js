import type { BaseClientOptions } from "./client";
import { Documents } from "./documents";
import { Ledger } from "./ledger";
import { Start } from "./start";

export type StructuredParserOptions = BaseClientOptions;

export class StructuredParser {
  public ledger: Ledger;
  public documents: Documents;
  public start: Start;

  constructor(options: StructuredParserOptions) {
    this.ledger = new Ledger(options);
    this.documents = new Documents(options);
    this.start = new Start(options);
  }

  static fromApiKey(apiKey: string): StructuredParser {
    return new StructuredParser({ apiKey });
  }
}
