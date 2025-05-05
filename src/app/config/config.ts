import dotenv from "dotenv";
import { Config } from "../type/config";

dotenv.config({ path: '.env' });

const config: Config = {
  NodeEnv: process.env.NODE_ENV || 'development',
  Port: process.env.PORT || '8000',
  Host: process.env.HOST || 'localhost',
  DBClient: process.env.DB_CLIENT || 'postgresql',
  DBName: process.env.DB_NAME || 'express-boilerplate',
  DBUser: process.env.DB_USER || 'postgres',
  DBPassword: process.env.DB_PASSWORD || 'postgre',
  DBHost: process.env.DB_HOST || 'localhost',
  DBPort: process.env.DB_PORT || '5433',
  DBSsl: process.env.DB_SSL || 'false',
  DBPoolMin: process.env.DB_POOL_MIN || '10',
  DBPoolMax: process.env.DB_POOL_MAX || '100',
  JWTAccessSecretKey: process.env.JWT_ACCESS_SECRET_KEY || 'secret',
  JWTRefreshSecretKey: process.env.JWT_REFRESH_SECRET_KEY || 'secret',
  JWTAccessExpiredIn: process.env.JWT_ACCESS_EXPIRED_IN || '3600000', // 1 hour
  JWTRefreshExpiredIn: process.env.JWT_REFRESH_EXPIRED_IN || '2592000000', // 30 days
  CookieSecretKey: process.env.COOKIE_SECRET_KEY || 'secret',
  CorsOrigin: process.env.CORS_ORIGIN || '*',
  RateLimitMax: process.env.RATE_LIMIT_MAX || '100',
  RateLimitWindowMs: process.env.RATE_LIMIT_WINDOW_MS || '3600000', // 1 hour
};

export default config;