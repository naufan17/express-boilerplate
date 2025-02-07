import knex, { Knex } from 'knex';
import { Model } from 'objection';
import knexfile from '../../knexfile';
import config from './config';

const environment: string = config.NodeEnv;
const knexInstance: Knex = knex(knexfile[environment]);

Model.knex(knexInstance);

export default knexInstance;