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
import { ApiOkResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { CommentService } from 'src/comment/comment.service';
import { Book } from './book.schema';
import { BookService } from './book.service';
import { CreateBookDto, UpdateBookDto } from './dto';
import { BookOperationPipe } from './pipes';
import { BookResponse, BooksResponse } from './swagger';

@Controller('/books')
export class BookController {
  constructor(
    private bookService: BookService,
    private commentService: CommentService,
  ) {}

  @ApiOkResponse({
    description: 'Creates and returns a book',
    type: BookResponse,
  })
  @Post()
  async create(
    @Req() req,
    @Res({ passthrough: true }) res,
    @Body() book: CreateBookDto,
  ) {
    const newBook = await this.bookService.create(req.user, book);
    res
      .status(201)
      .json({ message: 'book created successfully', book: newBook });
  }

  @ApiQuery({
    name: 'page',
    description: 'Page of books to return',
    required: false,
  })
  @ApiQuery({
    name: 'count',
    description: 'Number of books to return',
    required: false,
  })
  @ApiOkResponse({
    description: 'Returns a paginated list of books that belong to the user',
    type: BooksResponse,
    isArray: true,
  })
  @Get()
  async getAll(
    @Req() req,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page,
    @Query('count', new DefaultValuePipe(10), ParseIntPipe) count,
    @Res({ passthrough: true }) res,
  ) {
    const filter = req.user.is_admin ? {} : { author: req.user._id };
    const skip = (page - 1) * count;
    const { books, pagination } = await this.bookService.find(
      filter,
      skip,
      count,
    );
    res
      .status(200)
      .json({ message: 'books fetched successfully', books, pagination });
  }

  @ApiParam({
    name: '_id',
    description: '_id of the book to return',
    required: true,
  })
  @ApiOkResponse({
    description: 'Gets and returns a book with the specified _id',
    type: BookResponse,
  })
  @Get('/:_id')
  async get(
    @Param('_id', BookOperationPipe) book: HydratedDocument<Book>,
    @Res({ passthrough: true }) res,
  ) {
    res.status(200).json({ message: 'book fetched successfully', book });
  }

  @ApiParam({
    name: '_id',
    description: '_id of the book to update',
    required: true,
  })
  @ApiOkResponse({
    description: 'Updates and returns a book with the specified _id',
    type: BookResponse,
  })
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

  @ApiParam({
    name: '_id',
    description: '_id of the book to delete',
    required: true,
  })
  @ApiOkResponse({
    description: 'Deletes the book with the specified _id',
    type: '',
  })
  @Delete('/:_id')
  async delete(
    @Param('_id', BookOperationPipe) book: HydratedDocument<Book>,
    @Res({ passthrough: true }) res,
  ) {
    await this.bookService.delete(book);
    await this.commentService.deleteBookComments(String(book._id));
    res.status(204);
  }
}
