const dotenv = require('dotenv');

dotenv.config();

const {
  SERVER_PORT = 3000,
  DB = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  JWT_SECRET = 'some-secret-key',
  NODE_ENV = 'development',
} = process.env;

module.exports = {
  DB,
  SERVER_PORT,
  JWT_SECRET,
  NODE_ENV,
};
