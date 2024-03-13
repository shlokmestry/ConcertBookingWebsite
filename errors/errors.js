import { StatusCodes } from "http-status-codes";

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "Not found Error";
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export class UnAuthenticatedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnAuthenticatedError";
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export class UnAuthaurizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnAuthaurized";
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
