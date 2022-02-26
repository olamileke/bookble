import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ResetPasswordPipe implements PipeTransform {
  constructor(private userService: UserService) {}

  async transform(token: string) {
    const user = await this.userService.findOne({
      'password_reset.token': token,
    });

    if (!user) throw new BadRequestException('invalid reset token');

    if (Date.now() > user.password_reset.expires_at.getTime())
      throw new BadRequestException('expired reset token');

    return user;
  }
}
