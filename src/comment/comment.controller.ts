import {
  Controller,
  Post,
  Body,
  Param,
  Req,
  Res,
  Get,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { HydratedDocument } from 'mongoose';
import { Comment } from './comment.schema';
import { CommentCreatePipe } from './pipes';
import { Book } from 'src/book/book.schema';
import { CommentService } from './comment.service';

@Controller('/books/:book_id/comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  async create(
    @Param('book_id', CommentCreatePipe) book: HydratedDocument<Book>,
    @Body() commentDto: Comment,
    @Req() req,
    @Res({ passthrough: true }) res,
  ) {
    const comment = await this.commentService.create(
      req.user,
      book,
      commentDto,
    );

    res.status(201).json({ message: 'comment created successfully', comment });
  }

  @Get()
  async getAll(
    @Param('book_id', CommentCreatePipe) book: HydratedDocument<Book>,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page,
    @Query('count', new DefaultValuePipe(10), ParseIntPipe) count,
    @Res({ passthrough: true }) res,
  ) {
    const comments = await this.commentService.findCommentsByBook(
      String(book._id),
      page,
      count,
    );
    res
      .status(200)
      .json({ message: 'comments fetched successfully', comments });
  }
}
