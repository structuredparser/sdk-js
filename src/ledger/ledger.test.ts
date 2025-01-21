import { expect, test } from "vitest"
import { Ledger } from "."

test("ledger", async () => {
  const ledger = new Ledger({
    apiKey: "XUhFnkovSRaq4vsgjUB5kmKNU9k0aDHJmAFVEeHm",
    baseUrl: "http://127.0.0.1:4949",
  })

  const balances = await ledger.getBalances()

  expect(balances).toMatchObject({
    "tokens": 200008,
    "documents": 20,
  })
})