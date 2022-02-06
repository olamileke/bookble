import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { TokenService } from './token.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { tokenConstants } from './token.constants';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: tokenConstants.secret,
      signOptions: { expiresIn: '2d' },
    }),
  ],
  providers: [TokenService],
})
export class TokenModule {}
