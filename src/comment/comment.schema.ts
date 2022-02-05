import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Book } from 'src/book/book.schema';
import { User } from 'src/user/user.schema';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Comment {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Book', required: true })
  book: Book;

  @Prop({ type: Number, required: true })
  rating: number;

  @Prop({ type: String, required: true })
  text: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
