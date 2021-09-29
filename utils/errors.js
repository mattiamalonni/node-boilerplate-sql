export class CustomError extends Error {
  constructor(message, statusCode = 400, logLevel = 'error') {
    super(message);
    this.statusCode = statusCode;
    this.logLevel = logLevel;
  }
}

export class NotFoundError extends CustomError {
  constructor(message, statusCode = 404, logLevel = 'warn') {
    super(message, statusCode, logLevel);
  }
}

export class ValidationError extends CustomError {
  constructor(message, statusCode = 422) {
    super(message, statusCode);
  }
}

export class ConflictError extends CustomError {
  constructor(message, statusCode = 409, logLevel = 'warn') {
    super(message, statusCode);
  }
}

export class AuthenticationError extends CustomError {
  constructor(message, statusCode = 401, logLevel = 'warn') {
    super(message, statusCode, logLevel);
  }
}
