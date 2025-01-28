import { createLogger, format, transports, Logger } from "winston";
import { getDate } from "../utils/getdate";

const {
  combine,
  timestamp,
  json,
  simple,
  colorize,
} = format;

const dateFormat: string = getDate();

const logger: Logger = createLogger({
  level: "info",
  format: combine(
    timestamp(),
    json(),
  ),
  transports: [
    new transports.File({ filename: `logs/errors/${dateFormat}.log`, level: 'error' }),
    new transports.File({ filename: `logs/combined/${dateFormat}.log` }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: combine(
      colorize(),
      simple()
    ),
  }));
}

export default logger;