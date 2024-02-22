import { config as dotenvConfig } from 'dotenv';
import type { Knex } from 'knex';

dotenvConfig({ path: '../../.env' });

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: {
      database: process.env.BOOKING_DB_NAME,
      user: process.env.BOOKING_DB_USER,
      password: process.env.BOOKING_DB_PASSWORD,
    },
  },
  production: {
    client: 'postgresql',
    connection: process.env.BOOKING_POSTGRES_URL,
  },
};

module.exports = config;
