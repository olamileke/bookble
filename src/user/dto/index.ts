import { PartialType, PickType } from '@nestjs/mapped-types';
import { User } from '../user.schema';

export class UpdateUserDto extends PartialType(
  PickType(User, ['first_name', 'last_name', 'password'] as const),
) {}
