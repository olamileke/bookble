import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Book } from 'src/book/book.schema';
import { User } from 'src/user/user.schema';
import { IsString, IsDefined, IsNumber, Max, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Comment {
  @ApiProperty({ type: String })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  author: User;

  @ApiProperty({ type: String })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Book', required: true })
  book: Book;

  @ApiProperty()
  @IsNumber()
  @IsDefined()
  @Max(5)
  @Prop({ type: Number, required: true })
  rating: number;

  @ApiProperty()
  @IsString()
  @IsDefined()
  @Prop({ type: String, required: true })
  text: string;

  @IsDate()
  @Prop({ type: Date, default: null })
  deleted_at: Date | null;

  softDelete: () => void;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
