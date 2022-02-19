import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { User } from '../user.schema';
import { UserService } from '../user.service';

@Injectable()
export class UserCreatePipe implements PipeTransform {
  constructor(private userService: UserService) {}

  async transform(value: User) {
    const user = await this.userService.find({ email: value.email });

    if (user) {
      throw new BadRequestException('User with email exists already');
    }

    return value;
  }
}
