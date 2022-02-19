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
  Put,
} from '@nestjs/common';
import { HydratedDocument } from 'mongoose';
import { Comment } from './comment.schema';
import { CommentCreatePipe, CommentUpdatePipe } from './pipes';
import { Book } from 'src/book/book.schema';
import { CommentService } from './comment.service';
import { UpdateCommentDto } from './dto';

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
  ) {
    const skip = (page - 1) * count;
    const comments = await this.commentService.findCommentsByBook(
      String(book._id),
      skip,
      count,
    );
    return { message: 'comments fetched successfully', comments };
  }

  @Put('/:_id')
  async update(
    @Param('_id', CommentUpdatePipe) comment: HydratedDocument<Comment>,
    @Body() commentDto: UpdateCommentDto,
  ) {
    const updatedComment = await this.commentService.update(
      comment,
      commentDto,
    );
    return { message: 'comment updated successfully', comment: updatedComment };
  }
}
