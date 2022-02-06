import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  IsString,
  IsBoolean,
  IsEmail,
  Min,
  IsDate,
  IsDefined,
} from 'class-validator';

export type UserDocument = User & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class User {
  @IsString()
  @IsDefined()
  first_name: string;

  @IsString()
  @IsDefined()
  last_name: string;

  @IsEmail()
  @IsDefined()
  @Prop({
    unique: true,
  })
  email: string;

  @IsDate()
  email_verified_at?: Date;

  @IsString()
  @IsDefined()
  @Prop({ select: false })
  password: string;

  @IsString()
  avatar?: string;

  @IsBoolean()
  @Prop({ default: false })
  is_admin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
