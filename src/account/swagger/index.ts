import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/user.schema';
import { ApiCommonResponse } from '../../types';

export class ResetPasswordResponse extends ApiCommonResponse {
  @ApiProperty({ type: User })
  user: User;
}
