import knex, { Knex } from 'knex';
import { Model } from 'objection';
import knexfile from '../../knexfile';

const environment: string = process.env.NODE_ENV || 'development';
const knexInstance: Knex = knex(knexfile[environment]);

Model.knex(knexInstance);

const checkDatabaseConnection = async (): Promise<void> => {
  try {
    await knexInstance.raw('SELECT 1 + 1 AS result');
    console.log('[server] Database connection successful');
  } catch (error) {
    console.error('[server] Database connection failed:', error);
    process.exit(1);
  }
};

export default checkDatabaseConnection();