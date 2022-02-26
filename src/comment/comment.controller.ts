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
  Delete,
} from '@nestjs/common';
import { HydratedDocument } from 'mongoose';
import { Comment } from './comment.schema';
import { CommentCreatePipe, CommentOperationPipe } from './pipes';
import { Book } from 'src/book/book.schema';
import { CommentService } from './comment.service';
import { CreateCommentDto, UpdateCommentDto } from './dto';

@Controller('/books/:book_id/comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  async create(
    @Param('book_id', CommentCreatePipe) book: HydratedDocument<Book>,
    @Body() commentDto: CreateCommentDto,
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
    const { comments, pagination } =
      await this.commentService.findCommentsByBook(
        String(book._id),
        skip,
        count,
      );
    return { message: 'comments fetched successfully', comments, pagination };
  }

  @Put('/:_id')
  async update(
    @Param('_id', CommentOperationPipe) comment: HydratedDocument<Comment>,
    @Body() commentDto: UpdateCommentDto,
  ) {
    const updatedComment = await this.commentService.update(
      comment,
      commentDto,
    );
    return { message: 'comment updated successfully', comment: updatedComment };
  }

  @Delete('/:_id')
  async delete(
    @Param('_id', CommentOperationPipe) comment: HydratedDocument<Comment>,
    @Res({ passthrough: true }) res,
  ) {
    await comment.softDelete();
    res.status(204);
  }
}
