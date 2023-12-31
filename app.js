const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const limiter = require('./utils/limiter');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const errProcessing = require('./middlewares/errors');
const corsMiddleware = require('./middlewares/cors');

const { SERVER_PORT, DB } = require('./env.config');

const rootRouter = require('./routes/index');

const app = express();

app.use(helmet());

app.use(cors());

mongoose.connect(DB);

app.use(express.json());

app.use(requestLogger);

app.use(limiter);

app.use(corsMiddleware);

app.use('/', rootRouter);

app.use(errorLogger);
app.use(errors());
app.use(errProcessing);

app.listen(SERVER_PORT, () => {
  console.log(`App listening on port ${SERVER_PORT}`);
});
