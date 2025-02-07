const config: { [key: string]: string } = {
  NodeEnv: process.env.NODE_ENV || 'development',
  Port: process.env.PORT || '8000',
  Host: process.env.HOST || 'localhost',
  DBClient: process.env.DB_CLIENT || 'postgresql',
  DBUrl: process.env.DB_URL || 'postgresql://postgres:postgres@localhost:5432/express',
  DBSsl: process.env.DB_SSL || 'false',
  JwtSecretKey: process.env.JWT_SECRET_KEY || 'secret',
  JwtExpiredIn: process.env.JWT_EXPIRED_IN || '3600000', // 1 hour
  CorsOrigin: process.env.CORS_ORIGIN || '*',
  RateLimitWindowMs: process.env.RATE_LIMIT_WINDOW_MS || '600000', // 10 minutes
  RateLimitMax: process.env.RATE_LIMIT_MAX || '100',
};

export default config;