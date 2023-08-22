const mongoose = require('mongoose');

const Movie = require('../models/movie');

const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/BadRequestError');
const { errorMessages } = require('../errors/errors');

// GET
const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

// POST
const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(errorMessages.MESSAGE_ERROR_BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

// DELETE
const deleteMovie = (req, res, next) => {
  const movieId = req.params;
  const owner = req.user._id;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(errorMessages.MESSAGE_ERROR_NOT_FOUND);
      }
      if (String(movie.owner) !== owner) {
        throw new ForbiddenError(errorMessages.MESSAGE_ERROR_FORBIDDEN);
      }
      return Movie.deleteOne(movie)
        .then(() => res.send({ message: 'Карточка удалена.' }))
        .catch(next);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError(errorMessages.MESSAGE_ERROR_BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
