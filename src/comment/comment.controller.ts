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
  ) {}
}
