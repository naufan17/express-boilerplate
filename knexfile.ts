import type { Knex } from "knex";
import dotenv from "dotenv";
import { DatabaseConfig } from "./src/types/database.type";

dotenv.config();

const { 
  DB_CLIENT,
  DB_URL,
  DB_SSL
} = process.env as unknown as Required<DatabaseConfig>;

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: DB_CLIENT,
    connection: DB_URL,
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
    client: DB_CLIENT,
    connection: {
      connectionString: DB_URL,
      ssl: DB_SSL ? { rejectUnauthorized: false } : false
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
    client: DB_CLIENT,
    connection: {
      connectionString: DB_URL,
      ssl: DB_SSL ? { rejectUnauthorized: false } : false
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