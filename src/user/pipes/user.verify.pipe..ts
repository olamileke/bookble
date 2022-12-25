import { Injectable, PipeTransform, HttpStatus } from '@nestjs/common';
import { handleException } from 'src/utilities';
import { UserService } from '../user.service';

@Injectable()
export class UserVerifyPipe implements PipeTransform {
  constructor(private userService: UserService) {}

  async transform(token: string) {
    const user = await this.userService.findOne({
      email_verification_token: token,
    });

    if (!user) {
      handleException(
        HttpStatus.BAD_REQUEST,
        'account-002',
        'Email Verification Token Is Invalid',
      );
    }

    return user;
  }
}
