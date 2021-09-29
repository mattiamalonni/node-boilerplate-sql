import logger from '../utils/logger';
import { CustomError } from '../utils/errors';

export default () => (error, req, res, next) => {
  if (error instanceof CustomError) {
    logger.log({ level: error.logLevel, message: error.message });
    return res.status(error.statusCode).json({ error: error.message });
  }
  logger.error(error);
  return res.status(500).json({ error: 'Something went wrong. Please try again later.' });
};
