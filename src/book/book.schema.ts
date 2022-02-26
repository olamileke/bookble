import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/user.schema';
import { IsString, IsDefined, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export type BookDocument = Book & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Book {
  _id: Types.ObjectId;

  @ApiProperty({ type: String })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: User;

  @ApiProperty()
  @IsString()
  @IsDefined()
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty()
  @IsString()
  @IsDefined()
  @Prop({ type: String, required: true })
  description: string;

  @IsDate()
  @Prop({ type: Date, default: null })
  deleted_at: Date | null;

  softDelete: () => void;
}

export const BookSchema = SchemaFactory.createForClass(Book);
