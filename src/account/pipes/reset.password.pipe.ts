import { Injectable, HttpStatus, PipeTransform } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { handleException } from 'src/utilities';

@Injectable()
export class ResetPasswordPipe implements PipeTransform {
  constructor(private userService: UserService) {}

  async transform(token: string) {
    const user = await this.userService.findOne({
      'password_reset.token': token,
    });

    if (!user)
      handleException(
        HttpStatus.BAD_REQUEST,
        'account-002',
        'Invalid password reset token',
      );

    if (Date.now() > user.password_reset.expires_at.getTime())
      handleException(
        HttpStatus.BAD_REQUEST,
        'account-003',
        'Expired password reset token',
      );

    return user;
  }
}
