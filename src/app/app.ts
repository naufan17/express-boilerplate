/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Express, Request, Response } from "express";
import { responseInternalServerError, responseNotFound } from "./helper/responseBody";
import morgan from "morgan";
import helmet from "helmet";
import compress from "compression";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import passport from "./config/passport";
import limiter from "./config/ratelimit";
import logger from "./config/logger";
import cors from "./config/cors";
import apiV1 from "./api/v1/routes";
import config from "./config/config";

const openApiDocument = YAML.load('./docs/openapi.yaml');
const app: Express = express();
const cookieSecretKey: string = config.CookieSecretKey;
const stream: any = {
  write: (message: string) => {
    logger.info(message.trim());
  },
}

app.use(
  limiter,
  cors,
  helmet(),
  compress(),
  cookieParser(cookieSecretKey),
  passport.initialize(),
  express.json(),
  express.urlencoded({ extended: false }),
  morgan('combined', { stream }),
)

app.use("/api/v1", apiV1);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

app.use((req: Request, res: Response) => {
  return responseNotFound(res, 'Resource not found');
});

app.use((err: any, req: Request, res: Response) => {
  console.error(err.stack);
  return responseInternalServerError(res, 'Something went wrong');
});

export default app;