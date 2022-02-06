import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() user: User) {
    return await this.userService.create(user);
  }
}
