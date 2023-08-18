const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = require('../env.config');

const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');
const { errorMessages } = require('../errors/errors');

// AUTH
const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        email: user.email,
        name: user.name,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(errorMessages.MESSAGE_ERROR_CONFLICT));
      } else if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(errorMessages.MESSAGE_ERROR_BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.status(200).send({ token });
    })
    .catch(next);
};

// GET
const getCurrentUser = (req, res, next) => {
  const { userId } = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError(errorMessages.MESSAGE_ERROR_NOT_FOUND));
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError(errorMessages.MESSAGE_ERROR_BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

// PATCH
const updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorMessages.MESSAGE_ERROR_NOT_FOUND);
      } else {
        res.send(user);
      }
    })
    .catch(next);
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateUserInfo,
};
