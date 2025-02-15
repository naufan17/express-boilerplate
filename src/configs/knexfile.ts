import type { Knex } from "knex";
import config from "./config";

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: config.DBClient,
    connection: {
      database: config.DBName,
      host: config.DBHost,
      port: Number(config.DBPort),
      user: config.DBUser,
      password: config.DBPassword
    },
    pool: {
      min: Number(config.DBPoolMin),
      max: Number(config.DBPoolMax)
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "../../database/migrations"
    },
    seeds: {
      directory: "../../database/seeders"
    },
    // debug: true,
    acquireConnectionTimeout: 10000
  },
  staging: {
    client: config.DBClient,
    connection: {
      database: config.DBName,
      host: config.DBHost,
      port: Number(config.DBPort),
      user: config.DBUser,
      password: config.DBPassword,
      ssl: config.DBSsl ? { rejectUnauthorized: false } : false
    },
    pool: {
      min: Number(config.DBPoolMin),
      max: Number(config.DBPoolMax)
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "../../database/migrations"
    },
    seeds: {
      directory: "../../database/seeders"
    },
    acquireConnectionTimeout: 10000
  },
  production: {
    client: config.DBClient,
    connection: {
      database: config.DBName,
      host: config.DBHost,
      port: Number(config.DBPort),
      user: config.DBUser,
      password: config.DBPassword,
      ssl: config.DBSsl ? { rejectUnauthorized: false } : false
    },
    pool: {
      min: Number(config.DBPoolMin),
      max: Number(config.DBPoolMax)
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "../../database/migrations"
    },
    seeds: {
      directory: "../../database/seeders"
    },
    acquireConnectionTimeout: 10000
  }
};

export default knexConfig;