import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import {
  IsString,
  IsBoolean,
  IsEmail,
  IsDefined,
  MinLength,
} from 'class-validator';

class DeviceVerification {
  code: string;
  device: string;
  expires_at: Date;
}

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

  @Prop({ type: String })
  email_verification_token?: String;

  @Prop({ type: MongooseSchema.Types.Mixed })
  device_verification?: DeviceVerification;

  @IsString()
  @IsDefined()
  @MinLength(8)
  @Prop({ type: String, required: true })
  password: string;

  @IsString()
  @Prop({ type: String })
  avatar?: string;

  @IsBoolean()
  @Prop({ type: Boolean, default: false })
  is_admin: boolean;

  @Prop({ type: [String] })
  devices: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
