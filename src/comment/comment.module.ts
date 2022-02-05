import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './comment.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Comment.name,
        useFactory: () => {
          const schema = CommentSchema;
          return schema;
        },
      },
    ]),
  ],
})
export class CommentModule {}
