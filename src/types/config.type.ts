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
  JWTSecretKey: string;
  JWTExpiredIn: string;
  CorsOrigin: string;
  RateLimitWindowMs: string;
  RateLimitMax: string;
}