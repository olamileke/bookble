import { IsDefined, IsEmail, MinLength } from 'class-validator';

export class SendPasswordResetEmailDto {
  @IsEmail()
  @IsDefined()
  email: string;
}

export class ResetPasswordDto {
  @IsDefined()
  @MinLength(8)
  password: string;
}
