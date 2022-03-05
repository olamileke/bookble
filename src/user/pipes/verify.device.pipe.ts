import {
  BadRequestException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { handleException } from 'src/utilities';
import { UserService } from '../user.service';

@Injectable()
export class VerifyDevicePipe implements PipeTransform {
  constructor(private userService: UserService) {}

  async transform(code: string) {
    const user = await this.userService.findOne({
      'device_verification.code': code,
    });

    if (!user)
      handleException(
        HttpStatus.BAD_REQUEST,
        'account-003',
        'Incorrect Device Verification Code',
      );

    if (Date.now() > user.device_verification.expires_at.getTime())
      handleException(
        HttpStatus.BAD_REQUEST,
        'account-004',
        'Expired Device Verification Code',
      );

    return user;
  }
}
