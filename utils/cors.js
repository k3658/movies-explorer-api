const allowedCors = [
  'https://filmskk36.nomoreparties.co',
  'http://filmskk36.nomoreparties.co',
  'http://localhost:3000',
  'http://localhost:3001',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = { allowedCors, DEFAULT_ALLOWED_METHODS };
