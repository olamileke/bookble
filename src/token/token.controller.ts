import { Controller, Post, Body, Res, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateTokenDto } from './dto';
import { compare } from 'bcrypt';
import { TokenService } from './token.service';
import { UnguardedRoute } from 'src/utilities';

@Controller('tokens')
export class TokenController {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
  ) {}

  @UnguardedRoute()
  @Post()
  async create(@Body() credentials: CreateTokenDto, @Res() res) {
    const user = await this.userService.find({ email: credentials.email });
    if (!user) throw new NotFoundException('Incorrect username or password');

    if (!compare(credentials.password, user.password))
      throw new NotFoundException('Incorrect username or password');

    const token = await this.tokenService.generate(user._id);
    res.status(201).json({ token });
  }
}
