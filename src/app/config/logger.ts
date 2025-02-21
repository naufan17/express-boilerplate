import { createLogger, format, transports, Logger } from "winston";
import { fullDateNow } from "../util/fullDateNow";

const { combine, timestamp, json, simple, colorize } = format;
const dateFormat: string = fullDateNow();

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

logger.add(new transports.Console({
  format: combine(
    colorize(),
    simple()
  ),
}));

export default logger;