import { Controller, Post, Body, Put, Param } from '@nestjs/common';
import { EventEmitter2 } from 'eventemitter2';
import { HydratedDocument } from 'mongoose';
import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { UnguardedRoute } from 'src/utilities';
import { ResetPasswordDto, SendPasswordResetEmailDto } from './dto';
import { ResetPasswordEvent } from './events';
import { ResetPasswordPipe } from './pipes';
import * as bcrypt from 'bcrypt';

@Controller('accounts')
export class AccountController {
  constructor(
    private userService: UserService,
    private eventEmitter: EventEmitter2,
  ) {}

  @UnguardedRoute()
  @Post('/passwords')
  async sendPasswordResetEmail(@Body() body: SendPasswordResetEmailDto) {
    const { email } = body;
    let user = await this.userService.findOne({ email });

    if (!user) {
      return { message: 'password reset email sent successfully' };
    }

    user = await this.userService.generatePasswordReset(user);
    this.eventEmitter.emit('reset.password', new ResetPasswordEvent(user));

    return { message: 'password reset email sent successfully' };
  }

  @UnguardedRoute()
  @Put('/passwords/:token')
  async resetPassword(
    @Param('token', ResetPasswordPipe) user: HydratedDocument<User>,
    @Body() body: ResetPasswordDto,
  ) {
    const { password } = body;
    user.password = await bcrypt.hash(password, 10);
    user.password_reset = undefined;
    await user.save();
    return { message: 'user password changed successfully', user };
  }
}
