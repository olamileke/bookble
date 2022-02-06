import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { emailValidator } from 'src/validators';
import { IsString, IsBoolean, IsEmail, Min, IsDate } from 'class-validator';

export type UserDocument = User & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class User {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsEmail()
  @Prop({
    unique: true,
  })
  email: string;

  @IsDate()
  email_verified_at?: Date;

  @IsString()
  @Min(8)
  password: string;

  @IsString()
  avatar?: string;

  @IsBoolean()
  @Prop({ default: false })
  is_admin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
