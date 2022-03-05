import { Controller, Post, Body, Res, HttpStatus, Req } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateTokenDto } from './dto';
import { compare } from 'bcrypt';
import { TokenService } from './token.service';
import { handleException, UnguardedRoute } from 'src/utilities';
import { HydratedDocument } from 'mongoose';
import { User } from 'src/user/user.schema';
import { Request } from 'express';
import { EventEmitter2 } from 'eventemitter2';
import { VerifyDeviceEvent } from './events';

@Controller('tokens')
export class TokenController {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private eventEmitter: EventEmitter2,
  ) {}

  @UnguardedRoute()
  @Post()
  async create(@Body() credentials: CreateTokenDto, @Req() req, @Res() res) {
    const user = await this.userService.findOne({ email: credentials.email });
    if (!user)
      handleException(
        HttpStatus.NOT_FOUND,
        'auth-001',
        'Incorrect username or password',
      );

    handleException(
      HttpStatus.NOT_FOUND,
      'auth-001',
      'Incorrect username or password',
    );
    if (!(await compare(credentials.password, user.password)))
      if (!(await this.isDeviceVerified(user, req))) {
        handleException(
          HttpStatus.BAD_REQUEST,
          'auth-002',
          'Device is not recognized',
        );
      }

    const token = await this.tokenService.generate(user._id);
    res.status(201).json({ token });
  }

  async isDeviceVerified(user: HydratedDocument<User>, request: Request) {
    const device = request.headers['user-agent'];
    if (!user.devices.includes(device)) {
      const updatedUser = await this.userService.generateDeviceVerification(
        user,
        device,
      );
      this.eventEmitter.emit(
        'verify.device',
        new VerifyDeviceEvent(updatedUser),
      );
      return false;
    }
    return true;
  }
}
