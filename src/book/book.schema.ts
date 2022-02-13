import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/user.schema';
import { IsString, IsDefined, IsDate } from 'class-validator';

export type BookDocument = Book & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Book {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: User;

  @IsString()
  @IsDefined()
  @Prop({ type: String, required: true })
  name: string;

  @IsString()
  @IsDefined()
  @Prop({ type: String, required: true })
  description: string;

  @IsDate()
  @Prop({ type: Date })
  deleted_at?: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);
