const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/UnauthorizedError');
const { errorMessages } = require('../errors/errors');

const { NODE_ENV, JWT_SECRET } = require('../env.config');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(errorMessages.MESSAGE_ERROR_UNAUTHORIZED);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new UnauthorizedError(errorMessages.MESSAGE_ERROR_UNAUTHORIZED);
  }

  req.user = payload;

  next();
};

module.exports = auth;
