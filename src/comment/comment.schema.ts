import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Book } from 'src/book/book.schema';
import { User } from 'src/user/user.schema';
import { IsString, IsDefined, IsNumber, Max } from 'class-validator';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Comment {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  author: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Book', required: true })
  book: Book;

  @IsNumber()
  @IsDefined()
  @Max(5)
  @Prop({ type: Number, required: true })
  rating: number;

  @IsString()
  @IsDefined()
  @Prop({ type: String, required: true })
  text: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
