const { NODE_ENV, LOG_LEVEL } = process.env;

import winston from 'winston';

const customFormat = winston.format.printf(info => {
  if (info.stack) {
    return `[${info.timestamp}] - ${info.level}: ${info.message}\n${info.stack}`;
  }
  return `[${info.timestamp}] - ${info.level}: ${info.message}`;
});

const transports = [new winston.transports.Console()];

const format =
  NODE_ENV === 'development'
    ? winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.splat(),
        customFormat,
      )
    : winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.timestamp(),
        winston.format.splat(),
        customFormat,
      );

export default winston.createLogger({
  level: LOG_LEVEL,
  transports: transports,
  format: format,
});
