import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { bookbleConfig } from './config';
import { MongooseModule } from '@nestjs/mongoose';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { CommentModule } from './comment/comment.module';
import { TokenModule } from './token/token.module';
import { MailModule } from './mail/mail.module';
import { AccountController } from './account/account.controller';
import { AccountModule } from './account/account.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${bookbleConfig.dbUsername}:${bookbleConfig.dbPassword}@bookble.ttjut.mongodb.net/${bookbleConfig.dbName}?retryWrites=true&w=majority`,
    ),
    EventEmitterModule.forRoot({
      delimiter: '.',
    }),
    UserModule,
    BookModule,
    CommentModule,
    TokenModule,
    MailModule,
    AccountModule,
  ],
  controllers: [AppController, AccountController],
  providers: [AppService],
})
export class AppModule {}
