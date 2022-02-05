import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { bookbleConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(bookbleConfig.port);
}
bootstrap();
