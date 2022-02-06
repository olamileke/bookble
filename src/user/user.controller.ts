import { Controller, Post, Body, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { UserCreatePipe } from './pipes';
import { TokenService } from 'src/token/token.service';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
  ) {}

  @Post()
  async create(
    @Body(UserCreatePipe) user: User,
    @Res({ passthrough: true }) res,
  ) {
    const new_user = await this.userService.create(user);
    const token = await this.tokenService.generate(String(user._id));
    res.status(201).json({ user: new_user, token });
  }
}
