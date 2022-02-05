import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './book.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Book.name,
        useFactory: () => {
          const schema = BookSchema;
          return schema;
        },
      },
    ]),
  ],
})
export class BookModule {}
