import {
  Controller,
  Req,
  Res,
  Body,
  Param,
  Post,
  Delete,
} from '@nestjs/common';
import { HydratedDocument } from 'mongoose';
import { Book } from './book.schema';
import { BookService } from './book.service';
import { BookDeletePipe } from './pipes';

@Controller('/books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  async create(
    @Req() req,
    @Res({ passthrough: true }) res,
    @Body() book: Book,
  ) {
    const newBook = await this.bookService.create(req.user, book);
    res
      .status(201)
      .json({ message: 'book created successfully', book: newBook });
  }

  @Delete('/:_id')
  async delete(
    @Param('_id', BookDeletePipe) book: HydratedDocument<Book>,
    @Res({ passthrough: true }) res,
  ) {
    await this.bookService.delete(book);
    res.status(204);
  }
}
