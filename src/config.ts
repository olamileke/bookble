import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';

dotenv.config();

const swaggerDocumentConfig = new DocumentBuilder()
  .setTitle('The Bookble API')
  .setDescription('The Bookble API documentation')
  .setVersion('1.0')
  .addTag('books')
  .build();

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
  swaggerDocumentConfig,
};
