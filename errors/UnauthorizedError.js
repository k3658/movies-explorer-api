const { statusCodes } = require('./errors');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.ERR0R_UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
