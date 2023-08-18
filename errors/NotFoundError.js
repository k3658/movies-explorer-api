const { statusCodes } = require('./errors');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.ERROR_FORBIDDEN;
  }
}

module.exports = ForbiddenError;
