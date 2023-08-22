const moviesRouter = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const { validateMovieCreation, validateMovieDeletion } = require('../middlewares/validators');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', validateMovieCreation, createMovie);
moviesRouter.delete('/:movieId', validateMovieDeletion, deleteMovie);

module.exports = moviesRouter;
