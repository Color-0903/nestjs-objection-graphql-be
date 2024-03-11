
import * as dotenv from 'dotenv';
dotenv.config();

export const PgConfig = {
  client: process.env.PG,
  connection: {
    host: process.env.HOST,
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.USER_NAME,
    port: process.env.PORT,
  },
};
