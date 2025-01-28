import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compress from "compression";
import api from "./routes/api";
import "./configs/database";

const port: number = Number(process.env.PORT) || 8000;
const app: Express = express();
const host: string = process.env.HOST || "localhost";

app.use(
  morgan("combined"),
  cors(),
  helmet(),
  compress(),
  express.json(),
  express.urlencoded({ extended: false })
)

app.use("/api", api);

app.listen(port, () => {
  console.log(`[server] Server is running on http://${host}:${port}`);
});

export default app;