import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { UserCreatePipe } from './pipes';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body(UserCreatePipe) user: User) {
    return await this.userService.create(user);
  }
}
