const { statusCodes } = require('./errors');

class DefaultError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.ERROR_DEFAULT;
  }
}

module.exports = DefaultError;
