import { BaseClient } from "../client";
import { APIError, raiseAPIError } from "../client/errors";

export class Ledger extends BaseClient {
  /**
   * Get the balance of a specific currency
   * @param currency The currency to get the balance of
   * @returns The balance of the currency, or -1 if the currency is not found
   */
  public async getBalance(currency: string) {
    const balances = await this.getBalances()
    if (currency in balances) {
      return balances[currency]
    }
    return -1
  }

  /**
   * Get the balances of all currencies
   * @returns The balances of all currencies
   */
  public async getBalances() {
    return this.withRetry(async () => {
      const response = await this.client.GET("/getLedgerBalances", { params: { query: { projectId: this.projectId } } })

      if (response.error) {
        throw new APIError(response.error)
      }

      return response.data;
    })
  }
}
