import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { commentPlugin } from 'src/utilities/plugins';
import { Comment, CommentSchema } from './comment.schema';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { BookModule } from 'src/book/book.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Comment.name,
        useFactory: () => {
          const schema = CommentSchema;
          schema.plugin(commentPlugin);
          return schema;
        },
      },
    ]),
    BookModule,
  ],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
