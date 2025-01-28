import knex, { Knex } from 'knex';
import { Model } from 'objection';
import knexfile from '../../knexfile';

const environment: string = process.env.NODE_ENV || 'development';
const knexInstance: Knex = knex(knexfile[environment]);

Model.knex(knexInstance);

export default knexInstance;