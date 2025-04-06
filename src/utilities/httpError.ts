export class HttpError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export class BadRequestError extends HttpError {
    constructor(message: string) {
      super(message, 400);
    }
  }
  
  export class NotFoundError extends HttpError {
    constructor(message: string) {
      super(message, 404);
    }
  }
  
  export class UnauthorizedError extends HttpError {
    constructor(message: string) {
      super(message, 401);
    }
  }

  export class ServerError extends HttpError {
    constructor(message: string) {
      super(message, 500);
    }
  }

  
  // You can add more as needed (ForbiddenError, InternalServerError, etc.)
  