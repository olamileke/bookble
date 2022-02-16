import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  NotFoundException,
} from '@nestjs/common';
import { BookService } from 'src/book/book.service';

@Injectable()
export class CommentOperationPipe implements PipeTransform {
  constructor(private bookService: BookService) {}

  async transform(value: string, metadata: ArgumentMetadata) {
    const { data: param } = metadata;

    if (param === 'book_id') {
      const book = await this.bookService.findOne({ _id: value });

      if (!book) {
        throw new NotFoundException('book does not exist');
      }
      return book;
    }

    // if () {

    // }
  }

  async findBook(_id: string) {
    return await this.bookService.findOne({ _id });
  }
}
