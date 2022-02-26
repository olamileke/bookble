import { PartialType, PickType } from '@nestjs/swagger';
import { User } from '../user.schema';

export class CreateUserDto extends User {}

export class UpdateUserDto extends PartialType(
  PickType(User, ['first_name', 'last_name', 'password', 'avatar'] as const),
) {}
