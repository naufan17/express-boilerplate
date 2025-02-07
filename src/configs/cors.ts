import cors from "cors";
import config from "./config";

const corsOrigin: string = config.CorsOrigin || "*";

const corsOptions: cors.CorsOptions = {
  origin: corsOrigin,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Origin, Content-Type, Content-Length, Authorization",
  credentials: true,
  maxAge: 12 * 3600
};

export default cors(corsOptions);