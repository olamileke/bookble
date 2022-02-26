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
import { UserCreatePipe, VerifyDevicePipe } from './pipes';
import { TokenService } from 'src/token/token.service';
import { generateRandomToken, UnguardedRoute } from 'src/utilities';
import { CreateUserDto, UpdateUserDto } from './dto';
import { EventEmitter2 } from 'eventemitter2';
import { UserRegisteredEvent } from './events';
import { UserVerifyPipe } from './pipes';
import { HydratedDocument } from 'mongoose';

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
    @Body(UserCreatePipe) user: CreateUserDto,
    @Res({ passthrough: true }) res,
    @Req() req,
  ) {
    const newUser = await this.userService.create(user, req);
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

  @Post('/:_id/verification-tokens')
  async generateVerificationToken(@Req() req, @Res({ passthrough: true }) res) {
    const user = req.user;
    user.email_verification_token = generateRandomToken();
    await user.save();
    this.eventEmitter.emit('user.registered', new UserRegisteredEvent(user));
    res
      .status(200)
      .json({ message: 'verification email resent successfully', user });
  }

  @UnguardedRoute()
  @Put('/:_id/verification-tokens/:token')
  async verify(
    @Param('token', UserVerifyPipe) user: HydratedDocument<User>,
    @Res({ passthrough: true }) res,
  ) {
    user.email_verification_token = undefined;
    await user.save();
    res.status(200).json({ message: 'user verified successfully', user });
  }

  @UnguardedRoute()
  @Put('/:_id/devices/:code')
  async verifyDevice(
    @Param('code', VerifyDevicePipe) user: HydratedDocument<User>,
  ) {
    const { device } = user.device_verification;
    user.device_verification = undefined;
    user.devices = [...user.devices, device];
    await user.save();
    const token = await this.tokenService.generate(String(user._id));
    return { message: 'device added successfully', user, token };
  }
}
