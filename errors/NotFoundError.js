const { statusCodes } = require('./errors');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.ERROR_NOT_FOUND;
  }
}

module.exports = NotFoundError;
