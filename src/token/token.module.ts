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

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({
      secret: tokenConstants.secret,
      signOptions: { expiresIn: '2d' },
    }),
  ],
  providers: [
    TokenService,
    TokenStrategy,
    { provide: APP_GUARD, useClass: TokenGuard },
  ],
  exports: [TokenService],
  controllers: [TokenController],
})
export class TokenModule {}
