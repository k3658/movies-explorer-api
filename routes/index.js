const rootRouter = require('express').Router();

const usersRouter = require('./users');
const { createUser, login } = require('../controllers/users');
const moviesRouter = require('./movies');

const auth = require('../middlewares/auth');
const { validateSignUp, validateSignIn } = require('../middlewares/validators');

const NotFoundError = require('../errors/NotFoundError');
const { errorMessages } = require('../errors/errors');

rootRouter.post('/signup', validateSignUp, createUser);
rootRouter.post('/signin', validateSignIn, login);

rootRouter.use('/users', auth, usersRouter);
rootRouter.use('/cards', auth, moviesRouter);

rootRouter.use((req, res, next) => {
  next(new NotFoundError(errorMessages.MESSAGE_ERROR_NOT_FOUND));
});

module.exports = rootRouter;
