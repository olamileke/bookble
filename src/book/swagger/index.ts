import { ApiProperty } from '@nestjs/swagger';
import { ApiCommonResponse } from '../../types';
import { Book } from '../book.schema';

export class BookResponse extends ApiCommonResponse {
  @ApiProperty({ type: Book })
  book: Book;
}

export class BooksResponse extends ApiCommonResponse {
  @ApiProperty({ type: [Book] })
  books: Book[];
}
