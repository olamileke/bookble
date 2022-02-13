import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  PipeTransform,
  Req,
} from '@nestjs/common';
import { BookService } from '../book.service';

@Injectable()
export class BookDeletePipe implements PipeTransform {
  constructor(private bookService: BookService) {}

  async transform(_id: string, @Req() req) {
    const { user } = req;
    const book = await this.bookService.findOne({ _id });
    if (!book) {
      throw new NotFoundException('book does not exist');
    }
    if (user.is_admin) {
      return book;
    }

    if (book.author._id.toString() === user._id.toString()) {
      return book;
    }

    throw new ForbiddenException('user lacks the required permission');
  }
}
