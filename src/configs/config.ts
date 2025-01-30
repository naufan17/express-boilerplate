const config: { [key: string]: string } = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || '8000',
  HOST: process.env.HOST || 'localhost',
  DB_CLIENT: process.env.DB_CLIENT || 'postgresql',
  DB_URL: process.env.DB_URL || 'postgresql://postgres:postgres@localhost:5432/express',
  DB_SSL: process.env.DB_SSL || 'false',
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'secret',
  JWT_EXPIRED_IN: process.env.JWT_EXPIRED_IN || '3600000',
};

export default config;