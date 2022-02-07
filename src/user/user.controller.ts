import { Controller, Post, Body, Res, Put, Query, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { UserByIdPipe, UserCreatePipe } from './pipes';
import { TokenService } from 'src/token/token.service';
import { UnguardedRoute } from 'src/utilities';
import { UpdateUserDto } from './dto';
import { HydratedDocument } from 'mongoose';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
  ) {}

  @UnguardedRoute()
  @Post()
  async create(
    @Body(UserCreatePipe) user: User,
    @Res({ passthrough: true }) res,
  ) {
    const new_user = await this.userService.create(user);
    const token = await this.tokenService.generate(String(user._id));
    res.status(201).json({ user: new_user, token });
  }

  @Put('/:_id')
  async update(
    @Param('_id', UserByIdPipe) user: HydratedDocument<User>,
    @Body() body: UpdateUserDto,
    @Query('verify_email') verify_email,
    @Res() res,
  ) {
    const updated_user = await this.userService.update(
      user,
      body,
      verify_email,
    );
    res.status(200).json({ user: updated_user });
  }
}
