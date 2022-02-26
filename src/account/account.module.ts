import { Module } from '@nestjs/common';
import { MailModule } from 'src/mail/mail.module';
import { UserModule } from 'src/user/user.module';
import { ResetPasswordListener } from './listeners';

@Module({
  imports: [UserModule, MailModule],
  providers: [ResetPasswordListener],
})
export class AccountModule {}
