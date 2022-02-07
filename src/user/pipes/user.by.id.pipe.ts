import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { UserService } from '../user.service';

@Injectable()
export class UserByIdPipe implements PipeTransform {
  constructor(private userService: UserService) {}

  async transform(value: string) {
    const user = await this.userService.find({ _id: value });

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    return user;
  }
}
