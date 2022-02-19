import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './book.schema';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { bookPlugin, softDeletesPlugin } from 'src/utilities/plugins';
import { CommentModule } from 'src/comment/comment.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Book.name,
        useFactory: () => {
          const schema = BookSchema;
          schema.plugin(bookPlugin);
          schema.plugin(softDeletesPlugin);
          return schema;
        },
      },
    ]),
    forwardRef(() => CommentModule),
  ],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService],
})
export class BookModule {}
