import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { UserService } from '../user.service';

@Injectable()
export class VerifyDevicePipe implements PipeTransform {
  constructor(private userService: UserService) {}

  async transform(code: string) {
    const user = await this.userService.findOne({
      'device_verification.code': code,
    });

    if (!user)
      throw new BadRequestException('Incorrect Device Verification Code');

    if (Date.now() > user.device_verification.expires_at.getTime())
      throw new BadRequestException('Expired Device Verification Token');

    return user;
  }
}
