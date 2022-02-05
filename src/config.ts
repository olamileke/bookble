import * as dotenv from 'dotenv';

dotenv.config();

export const bookbleConfig = {
  port: process.env.APP_PORT,
  dbName: process.env.DB_NAME,
  dbPassword: process.env.DB_PASSWORD,
  dbUsername: process.env.DB_USERNAME,
};
