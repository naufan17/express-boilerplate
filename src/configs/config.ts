import dotenv from "dotenv";
import { Config } from "../types/config.type";

dotenv.config({ path: '.env' });

const config: Config = {
  NodeEnv: process.env.NODE_ENV || 'development',
  Port: process.env.PORT || '8000',
  Host: process.env.HOST || 'localhost',
  DBClient: process.env.DB_CLIENT || 'postgresql',
  DBName: process.env.DB_NAME || 'login',
  DBUser: process.env.DB_USER || 'postgres',
  DBPassword: process.env.DB_PASSWORD || 'postgres',
  DBHost: process.env.DB_HOST || 'localhost',
  DBPort: process.env.DB_PORT || '5433',
  DBSsl: process.env.DB_SSL || 'false',
  DBPoolMin: process.env.DB_POOL_MIN || '2',
  DBPoolMax: process.env.DB_POOL_MAX || '10',
  JWTSecretKey: process.env.JWT_SECRET_KEY || 'secret',
  JWTExpiredIn: process.env.JWT_EXPIRED_IN || '3600000', // 1 hour
  CorsOrigin: process.env.CORS_ORIGIN || '*',
  RateLimitWindowMs: process.env.RATE_LIMIT_WINDOW_MS || '600000', // 10 minutes
  RateLimitMax: process.env.RATE_LIMIT_MAX || '100',
};

export default config;