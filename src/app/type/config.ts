export interface Config {
  NodeEnv: string;
  Port: string;
  Host: string;
  DBClient: string;
  DBName: string;
  DBUser: string;
  DBPassword: string;
  DBHost: string;
  DBPort: string;
  DBSsl: string;
  DBPoolMin: string;
  DBPoolMax: string;
  JWTAccessSecretKey: string;
  JWTRefreshSecretKey: string;
  JWTAccessExpiredIn: string;
  JWTRefreshExpiredIn: string;
  CookieSecretKey: string;
  CorsOrigin: string;
  RateLimitWindowMs: string;
  RateLimitMax: string;
}