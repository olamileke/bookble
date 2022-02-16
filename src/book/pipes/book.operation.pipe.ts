import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  PipeTransform,
  Inject,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
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
      throw new NotFoundException('book does not exist');
    }

    if (isDelete && this.request.user.is_admin) {
      return book;
    }

    if (book.author._id.toString() === this.request.user._id.toString()) {
      return book;
    }

    throw new ForbiddenException('user lacks the required permission');
  }
}
