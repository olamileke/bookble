import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { UserService } from '../user.service';

@Injectable()
export class UserVerifyPipe implements PipeTransform {
  constructor(private userService: UserService) {}

  async transform(token: string) {
    const user = await this.userService.find({
      email_verification_token: token,
    });

    if (!user) {
      throw new BadRequestException('email verification token is invalid');
    }

    return user;
  }
}
