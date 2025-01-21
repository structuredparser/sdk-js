import type { operations } from "./schema";

export type OpSearch<T extends keyof operations> = OpQuery<T>;

export type OpQuery<T extends keyof operations> =
  operations[T]["parameters"]["query"];

export type OpPath<T extends keyof operations> = T extends keyof operations
  ? operations[T] extends { parameters: infer P }
  ? P extends { path: infer Q }
  ? Q
  : never
  : never
  : never;

export type OpParameters<T extends keyof operations> =
  T extends keyof operations
  ? operations[T] extends { parameters: infer P }
  ? P
  : never
  : never;

export type OpBody<T extends keyof operations> = NonNullable<
  operations[T]["requestBody"]
>["content"]["application/json"];

export type OpResponse<T extends keyof operations> = T extends keyof operations
  ? operations[T] extends { responses: infer P }
  ? P
  : never
  : never;
