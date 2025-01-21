import { BaseClient } from "../client";
import { APIError } from "../client/errors";
import { type OpBody, schemas } from "../openapi";

export class Documents extends BaseClient {
  /**
   * Retrieve a document by its ID
   * @param documentId The ID of the document to retrieve
   * @returns The document
   */
  public async retrieve(documentId: string) {
    return this.withRetry(async () => {
      const response = await this.client.GET("/getDocument", {
        params: { query: { projectId: this.projectId, documentId } },
      });

      if (response.error) {
        throw new APIError(response.error);
      }

      return response.data;
    });
  }

  /**
   * Download a given representation of a document
   * @param documentId The ID of the document to download
   * @returns An object containing the pre-signed URL to download the document
   */
  public async download(
    documentId: string,
    kind: OpBody<"download-document">["kind"],
  ) {
    return this.withRetry(async () => {
      const response = await this.client.GET("/downloadDocument", {
        params: { query: { projectId: this.projectId, documentId, kind } },
      });

      if (response.error) {
        throw new APIError(response.error);
      }

      return response.data;
    });
  }
}
