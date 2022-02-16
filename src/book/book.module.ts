import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './book.schema';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { bookPlugin, softDeletesPlugin } from 'src/utilities/plugins';

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
  ],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService],
})
export class BookModule {}
