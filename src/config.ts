import * as dotenv from 'dotenv';

dotenv.config();

export const bookbleConfig = {
  appName: process.env.APP_NAME,
  port: process.env.APP_PORT,
  dbName: process.env.DB_NAME,
  dbPassword: process.env.DB_PASSWORD,
  clientUrl: process.env.CLIENT_URL,
  dbUsername: process.env.DB_USERNAME,
  jwtSecret: process.env.JWT_SECRET,
  mailFrom: process.env.MAIL_FROM,
  mailDomain: process.env.MAIL_DOMAIN,
  mailgunApiKey: process.env.MAILGUN_API_KEY,
};
