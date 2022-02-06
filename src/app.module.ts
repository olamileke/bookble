import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { bookbleConfig } from './config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${bookbleConfig.dbUsername}:${bookbleConfig.dbPassword}@bookble.ttjut.mongodb.net/${bookbleConfig.dbName}?retryWrites=true&w=majority`,
    ),
    UserModule,
    BookModule,
    CommentModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
