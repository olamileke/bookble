import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { emailValidator } from 'src/validators';

export type UserDocument = User & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class User {
  @Prop({ type: String, required: true })
  first_name: string;

  @Prop({ type: String, required: true })
  last_name: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => emailValidator(email),
      message: ({ value }) => `${value} is not a valid email address`,
    },
  })
  email: string;

  @Prop({ type: Date })
  email_verified_at?: Date;

  @Prop({ type: String, required: true })
  password: string;

  @Prop()
  avatar?: string;

  @Prop({ type: Boolean, default: false })
  is_admin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
