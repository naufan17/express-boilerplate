import type { Knex } from "knex";
import dotenv from "dotenv";
import { DatabaseConfig } from "./src/types/database.type";

dotenv.config();

const { 
  DB_CLIENT,
  DB_URL
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
    }
  },
  staging: {
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
    }
  },
  production: {
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
      directory: "./database/seeders",
    }
  }
};

export default knexConfig;