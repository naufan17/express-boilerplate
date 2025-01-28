import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compress from "compression";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import api from "./routes/api";
import logger from "./configs/logger";
import "./configs/database";

const openApiDocument = YAML.load('./docs/openapi.yaml');
const port: number = Number(process.env.PORT) || 8000;
const app: Express = express();
const host: string = process.env.HOST || "localhost";
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

// Log requests
app.use(morgan('combined', { stream }));

// API routes 
app.use("/api/v1", api);

// OpenAPI documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

app.listen(port, () => {
  console.log(`[server] Server is running on http://${host}:${port}`);
});

export default app;