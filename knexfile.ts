import type { Knex } from "knex";
import config from "./src/configs/config";

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: config.DBClient,
    connection: config.DBUrl,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeders"
    },
    // debug: true,
    acquireConnectionTimeout: 10000
  },
  staging: {
    client: config.DBClient,
    connection: {
      connectionString: config.DBUrl,
      ssl: config.DBSsl ? { rejectUnauthorized: false } : false
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeders"
    },
    acquireConnectionTimeout: 10000
  },
  production: {
    client: config.DBClient,
    connection: {
      connectionString: config.DBUrl,
      ssl: config.DBSsl ? { rejectUnauthorized: false } : false
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeders"
    },
    acquireConnectionTimeout: 10000
  }
};

export default knexConfig;