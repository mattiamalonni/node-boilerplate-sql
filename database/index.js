import { Sequelize } from 'sequelize';
import logger from '../utils/logger';

const { DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_PORT } = process.env;

const database = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, {
  host: DATABASE_HOST,
  port: DATABASE_PORT || 3306,
  dialect: 'mysql',
  pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
  logging: msg => logger.debug(msg),
});

export default database;
