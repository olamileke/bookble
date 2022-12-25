import {
  Injectable,
  PipeTransform,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { handleException } from 'src/utilities';
import { User } from '../user.schema';
import { UserService } from '../user.service';

@Injectable()
export class UserCreatePipe implements PipeTransform {
  constructor(private userService: UserService) {}

  async transform(value: User) {
    const user = await this.userService.findOne({ email: value.email });

    if (user) {
      handleException(
        HttpStatus.BAD_REQUEST,
        'account-001',
        'User With Email Exists Already',
      );
    }

    return value;
  }
}
