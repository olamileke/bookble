import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  Put,
  Query,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { UserCreatePipe } from './pipes';
import { TokenService } from 'src/token/token.service';
import { UnguardedRoute } from 'src/utilities';
import { UpdateUserDto } from './dto';
import { EventEmitter2 } from 'eventemitter2';
import { UserRegisteredEvent } from './events';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private eventEmitter: EventEmitter2,
  ) {}

  @UnguardedRoute()
  @Post()
  async create(
    @Body(UserCreatePipe) user: User,
    @Res({ passthrough: true }) res,
  ) {
    const newUser = await this.userService.create(user);
    const token = await this.tokenService.generate(String(user._id));
    this.eventEmitter.emit('user.registered', new UserRegisteredEvent(newUser));
    res
      .status(201)
      .json({ message: 'user created successfully', user: newUser, token });
  }

  @Put('/:_id')
  async update(
    @Req() req,
    @Body() body: UpdateUserDto,
    @Query('verify_email') verify_email,
    @Res({ passthrough: true }) res,
  ) {
    const updatedUser = await this.userService.update(
      req.user,
      body,
      verify_email,
    );
    res
      .status(200)
      .json({ message: 'user updated successfully', user: updatedUser });
  }
}
