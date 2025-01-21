import type { schemas } from "../openapi";

export type NotFoundError = schemas["NotFoundError"]
export type ValidatorError = schemas["ValidatorError"]
export type ForbiddenError = schemas["ForbiddenError"]
export type UnauthorizedError = schemas["UnauthorizedError"]
export type InternalServerError = schemas["InternalServerError"]

export type SomeError = NotFoundError | ValidatorError | ForbiddenError | UnauthorizedError | InternalServerError

export class APIError extends Error {
  public error: SomeError

  constructor(error: SomeError) {
    super(error.message)
    this.error = error
  }

  isNotFound() {
    return this.error.statusCode === 404
  }

  isUnauthorizedOrForbidden() {
    return this.isUnauthorized() || this.isForbidden()
  }

  isForbidden() {
    return this.error.statusCode === 403
  }

  isUnauthorized() {
    return this.error.statusCode === 401
  }

  isInternalServerError() {
    return this.error.statusCode === 500
  }

  isValidatorError() {
    return this.error.statusCode === 400
  }

  static isAPIError = (error: unknown): error is APIError => {
    return error instanceof APIError
  }

  static fromSomeError = (someError: SomeError) => {
    return new APIError(someError)
  }
}

export const raiseAPIError = (someError: SomeError) => {
  throw new APIError(someError)
}
