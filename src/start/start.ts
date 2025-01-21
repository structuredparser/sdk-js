import { BaseClient } from "../client";
import { APIError } from "../client/errors";
import type { OpBody } from "../openapi";

export class Start extends BaseClient {
  public async fromExistingDocument(
    documentId: string,
    schema: { schema: OpBody<"parse-existing-document">["schema"] },
  ) {
    return this.withRetry(async () => {
      const response = await this.client.POST("/parseExistingDocument", {
        body: {
          projectId: this.projectId,
          documentId,
          schema: schema.schema,
        },
      });

      if (response.error) {
        throw new APIError(response.error);
      }

      return response.data;
    });
  }

  public async fromUrl(
    url: string,
    parses: OpBody<"add-document">["parses"],
    options: { contentType?: string } = {},
  ) {
    return this.withRetry(async () => {
      const response = await this.client.POST("/addDocument", {
        body: {
          projectId: this.projectId,
          descriptor: {
            type: "url",
            url: url,
            contentType: options.contentType,
          },
          parses,
        },
      });

      if (response.error) {
        throw new APIError(response.error);
      }

      return response.data;
    });
  }

  public async fromPlain(
    contents: string,
    parses: OpBody<"add-document">["parses"],
    options: { contentType: string } = { contentType: "text/plain" },
  ) {
    return this.withRetry(async () => {
      const response = await this.client.POST("/addDocument", {
        body: {
          projectId: this.projectId,
          descriptor: {
            type: "plain",
            contents,
            contentType: options.contentType
          },
          parses,
        },
      });

      if (response.error) {
        throw new APIError(response.error);
      }

      return response.data;
    });
  }

  public async fromFile(
    file: File,
    parses: OpBody<"add-document">["parses"],
    options: { contentType: string },
  ) {
    if (!file) throw new Error("No file provided")
    if (!options.contentType) throw new Error("No content type provided")

    return this.withRetry(async () => {
      const response = await this.client.POST("/addDocument", {
        body: {
          projectId: this.projectId,
          descriptor: {
            type: "base64",
            data: await fileToBase64(file),
            contentType: options.contentType,
          },
          parses,
        },
      });

      if (response.error) {
        throw new APIError(response.error);
      }

      return response.data;
    });
  }

  public async fromBase64(
    base64: string,
    parses: OpBody<"add-document">["parses"],
    options: { contentType: string },
  ) {
    return this.withRetry(async () => {
      const response = await this.client.POST("/addDocument", {
        body: {
          projectId: this.projectId,
          descriptor: {
            type: "base64",
            data: base64,
            contentType: options.contentType,
          },
          parses,
        },
      });

      if (response.error) {
        throw new APIError(response.error);
      }

      return response.data;
    });
  }

  public async fromBuffer(
    buffer: Buffer,
    parses: OpBody<"add-document">["parses"],
    options: { contentType: string },
  ) {
    return this.withRetry(async () => {
      const response = await this.client.POST("/addDocument", {
        body: {
          projectId: this.projectId,
          descriptor: {
            type: "base64",
            data: buffer.toString("base64"),
            contentType: options.contentType,
          },
          parses,
        },
      });

      if (response.error) {
        throw new APIError(response.error);
      }

      return response.data;
    });
  }
}

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        const parts = reader.result.split(",");
        if (parts.length < 2) {
          reject(new Error("Invalid base64 data format"));
        } else {
          resolve(parts[1] as string);
        }
      } else {
        reject(new Error("Failed to read file as base64"));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}