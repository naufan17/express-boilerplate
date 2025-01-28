import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compress from "compression";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import api from "../routes";
import logger from "./logger";
import "./database";

const openApiDocument = YAML.load('./docs/openapi.yaml');
const app: Express = express();
const stream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
}

app.use(
  cors(),
  helmet(),
  compress(),
  express.json(),
  express.urlencoded({ extended: false })
)

app.use(morgan('combined', { stream }));
app.use("/api/v1", api);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

export default app;