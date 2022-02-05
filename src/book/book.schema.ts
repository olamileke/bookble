import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/user/user.schema';

export type BookDocument = Book & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Book {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  author: User;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Date })
  deleted_at?: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);
