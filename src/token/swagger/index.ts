import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/user.schema';
import { ApiCommonResponse } from '../../types';

export class TokenResponse extends ApiCommonResponse {
  @ApiProperty()
  token: string;

  @ApiProperty({ type: User })
  user: User;
}
