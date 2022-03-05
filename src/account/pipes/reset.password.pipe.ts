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
        'account-005',
        'Invalid Password Reset Token',
      );

    if (Date.now() > user.password_reset.expires_at.getTime())
      handleException(
        HttpStatus.BAD_REQUEST,
        'account-006',
        'Expired Password Reset Token',
      );

    return user;
  }
}
