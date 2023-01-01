import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { bookbleConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      skipMissingProperties: true,
      whitelist: true,
    }),
  );
  const swaggerDocument = SwaggerModule.createDocument(
    app,
    bookbleConfig.swaggerDocumentConfig,
  );
  SwaggerModule.setup('/', app, swaggerDocument, {
    customSiteTitle: 'Bookble Documentation',
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
    },
  });
  await app.listen(bookbleConfig.port);
}
bootstrap();
