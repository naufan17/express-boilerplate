export interface Config {
  NodeEnv: string;
  Port: string;
  Host: string;
  DBClient: string;
  DBUrl: string;
  DBSsl: string;
  JWTSecretKey: string;
  JWTExpiredIn: string;
  CorsOrigin: string;
  RateLimitWindowMs: string;
  RateLimitMax: string;
}