import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TokenModule } from 'src/token/token.module';
import { MailModule } from 'src/mail/mail.module';
import { UserRegisteredListener } from './listeners/user.registered.listener';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          return schema;
        },
      },
    ]),
    forwardRef(() => TokenModule),
    MailModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRegisteredListener],
  exports: [UserService],
})
export class UserModule {}
