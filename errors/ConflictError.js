const { statusCodes } = require('./errors');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.ERROR_CONFLICT;
  }
}

module.exports = ConflictError;
