import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
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
  _id: Types.ObjectId;

  @IsString()
  @IsDefined()
  @Prop({ type: String, required: true })
  first_name: string;

  @IsString()
  @IsDefined()
  @Prop({ type: String, required: true })
  last_name: string;

  @IsEmail()
  @IsDefined()
  @Prop({
    type: String,
    unique: true,
  })
  email: string;

  @IsDate()
  @Prop({ type: Date })
  email_verified_at?: Date;

  @IsString()
  @IsDefined()
  @Prop({ type: String, required: true })
  password: string;

  @IsString()
  @Prop({ type: String })
  avatar?: string;

  @IsBoolean()
  @Prop({ type: Boolean, default: false })
  is_admin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
