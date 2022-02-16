import {
  Controller,
  Req,
  Res,
  Body,
  Param,
  Query,
  Post,
  Get,
  Delete,
  ParseIntPipe,
  DefaultValuePipe,
  Put,
} from '@nestjs/common';
import { HydratedDocument } from 'mongoose';
import { Book } from './book.schema';
import { BookService } from './book.service';
import { UpdateBookDto } from './dto';
import { BookOperationPipe } from './pipes';

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

  @Get()
  async getAll(
    @Req() req,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page,
    @Query('count', new DefaultValuePipe(10), ParseIntPipe) count,
    @Res({ passthrough: true }) res,
  ) {
    const filter = req.user.is_admin ? {} : { author: req.user._id };
    const skip = (page - 1) * count;
    const books = await this.bookService.find(filter, skip, count);
    res.status(200).json({ message: 'books fetched successfully', books });
  }

  @Get('/:_id')
  async get(
    @Param('_id', BookOperationPipe) book: HydratedDocument<Book>,
    @Res({ passthrough: true }) res,
  ) {
    res.status(200).json({ message: 'book fetched successfully', book });
  }

  @Put('/:_id')
  async update(
    @Param('_id', BookOperationPipe) book: HydratedDocument<Book>,
    @Body() body: UpdateBookDto,
    @Res({ passthrough: true }) res,
  ) {
    const updated_book = await this.bookService.update(book, body);
    res
      .status(200)
      .json({ message: 'book updated successfully', book: updated_book });
  }

  @Delete('/:_id')
  async delete(
    @Param('_id', BookOperationPipe) book: HydratedDocument<Book>,
    @Res({ passthrough: true }) res,
  ) {
    await this.bookService.delete(book);
    res.status(204);
  }
}
