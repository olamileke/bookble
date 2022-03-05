import { Injectable, PipeTransform, Inject, HttpStatus } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { handleException } from 'src/utilities';
import { BookService } from '../book.service';

@Injectable()
export class BookOperationPipe implements PipeTransform {
  constructor(
    private bookService: BookService,
    @Inject(REQUEST) private request,
  ) {}

  async transform(_id: string) {
    const book = await this.bookService.findOne({ _id });
    const isDelete = this.request.method.toLowerCase() === 'delete';
    if (!book) {
      handleException(HttpStatus.NOT_FOUND, 'book-001', 'Book does not exist');
    }

    if (isDelete && this.request.user.is_admin) {
      return book;
    }

    if (book.author._id.toString() === this.request.user._id.toString()) {
      return book;
    }

    handleException(
      HttpStatus.FORBIDDEN,
      'book-002',
      'User lacks the required permissions',
    );
  }
}
