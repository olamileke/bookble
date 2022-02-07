import { PickType } from '@nestjs/mapped-types';
import { User } from 'src/user/user.schema';

export class CreateTokenDto extends PickType(User, [
  'email',
  'password',
] as const) {}
