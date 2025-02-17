/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Express } from "express";
import morgan from "morgan";
import helmet from "helmet";
import compress from "compression";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import passport from "./config/passport";
import limiter from "./config/ratelimit";
import logger from "./config/logger";
import cors from "./config/cors";
import apiV1 from "./api/v1/routes";

const openApiDocument = YAML.load('./docs/openapi.yaml');
const app: Express = express();
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
  passport.initialize(),
  morgan('combined', { stream }),
  express.json(),
  express.urlencoded({ extended: false }),
)

app.use("/api/v1", apiV1);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

export default app;