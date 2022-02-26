import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, MinLength } from 'class-validator';

export class SendPasswordResetEmailDto {
  @ApiProperty()
  @IsEmail()
  @IsDefined()
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty()
  @IsDefined()
  @MinLength(8)
  password: string;
}
