import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { commentPlugin, softDeletesPlugin } from 'src/utilities/plugins';
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
          schema.plugin(softDeletesPlugin);
          return schema;
        },
      },
    ]),
    forwardRef(() => BookModule),
  ],
  providers: [CommentService],
  controllers: [CommentController],
  exports: [CommentService],
})
export class CommentModule {}
