import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  generate(_id: string) {
    const payload = { sub: _id };
    return this.jwtService.sign(payload);
  }
}
