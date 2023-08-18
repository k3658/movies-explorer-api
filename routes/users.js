const usersRouter = require('express').Router();

const {
  getCurrentUser,
  updateUserInfo,
} = require('../controllers/users');

const {
  validateUserInfo,
} = require('../middlewares/validators');

usersRouter.get('/me', getCurrentUser);
usersRouter.patch('/me', validateUserInfo, updateUserInfo);

module.exports = {
  usersRouter,
};
