import { PipeTransform, Injectable, Inject, HttpStatus } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BookService } from 'src/book/book.service';
import { handleException } from 'src/utilities';
import { CommentService } from '../comment.service';

@Injectable()
export class CommentCreatePipe implements PipeTransform {
  constructor(
    @Inject(REQUEST) private request: Request,
    private bookService: BookService,
    private commentService: CommentService,
  ) {}

  async transform(value: string) {
    const book = await this.bookService.findOne({ _id: value });

    if (!book) {
      handleException(HttpStatus.NOT_FOUND, 'book-001', 'Book does not exist');
    }

    if (this.request.method.toLowerCase() === 'get') return book;

    const book_id = this.request.params['book_id'];
    const user_id = this.request.user['_id'];
    const comment = await this.commentService.findOne({
      book: book_id,
      author: user_id,
    });

    if (comment) {
      handleException(
        HttpStatus.BAD_REQUEST,
        'comment-003',
        'User has commented on this book already.',
      );
    }

    return book;
  }
}
