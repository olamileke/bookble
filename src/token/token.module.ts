import { Module, forwardRef } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { TokenService } from './token.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { tokenConstants } from './token.constants';
import { TokenController } from './token.controller';
import { APP_GUARD } from '@nestjs/core';
import { TokenGuard } from './token.guard';
import { TokenStrategy } from './token.strategy';
import { MailModule } from 'src/mail/mail.module';
import { VerifyDeviceListener } from './listeners';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({
      secret: tokenConstants.secret,
      signOptions: { expiresIn: '2d' },
    }),
    MailModule,
  ],
  providers: [
    TokenService,
    TokenStrategy,
    { provide: APP_GUARD, useClass: TokenGuard },
    VerifyDeviceListener,
  ],
  exports: [TokenService],
  controllers: [TokenController],
})
export class TokenModule {}
