const { statusCodes } = require('./errors');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.ERROR_BAD_REQUEST;
  }
}

module.exports = BadRequestError;
