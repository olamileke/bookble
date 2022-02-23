import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { tokenConstants } from './token.constants';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: tokenConstants.secret,
    });
  }

  async validate(payload: { sub: string }) {
    return await this.userService.findOne({ _id: payload.sub });
  }
}
