const { PORT, NODE_ENV, DATABASE_HOST, DATABASE_NAME } = process.env;

import express from 'express';
import 'express-async-errors';

// MIDDLEWARES
import basicAuth from './middlewares/basicAuth';
import cors from './middlewares/cors';
import errors from './middlewares/errors';
import swagger from './middlewares/swagger';

// DATABASE
import database from './database';

// MIGRATIONS
import migrations from './database/migrations';
import seed from './database/seed';

// ROUTES
import routes from './routes';

// UTILS
import logger from './utils/logger';

const server = express();

server.use(express.json({ limit: '1MB' }));
server.use(cors());

server.use('/public', express.static(__dirname + '/public'));
server.use('/docs', basicAuth, swagger);
server.use('/', routes);

server.use(errors());

server.listen(PORT, async () => {
  try {
    logger.info(`DB: authenticating "${DATABASE_NAME}" on host "${DATABASE_HOST}"`);
    await database.authenticate();

    logger.info(`DB: setting up migrations`);
    await migrations.setup();

    logger.info(`DB: executing migrations`);
    await migrations.execute();

    logger.info(`DB: executing migrations`);
    await migrations.execute();

    logger.info(`DB: executing seed`);
    await seed.execute();

    logger.info(`Server started in ${NODE_ENV} mode on port ${PORT}...`);
  } catch (error) {
    logger.error(error);
  }
});
