import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './comment.schema';
import { HydratedDocument, Model, Types } from 'mongoose';
import { Book } from 'src/book/book.schema';
import { User } from 'src/user/user.schema';
import { UpdateCommentDto } from './dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private comment: Model<CommentDocument>,
  ) {}

  async findOne(filter: { [key: string]: string }) {
    return this.comment.findOne(filter);
  }

  async findCommentsByBook(
    book_id: string,
    skip: number = 1,
    limit: number = 1,
  ) {
    return await this.comment.find({ book: book_id }).skip(skip).limit(limit);
  }

  async create(
    user: HydratedDocument<User>,
    book: HydratedDocument<Book>,
    commentDto: Comment,
  ) {
    const comment = this.comment.create({
      ...commentDto,
      author: user._id,
      book: book._id,
    });
    return comment;
  }

  async update(
    comment: HydratedDocument<Comment>,
    commentDto: UpdateCommentDto,
  ) {
    Object.entries(commentDto).forEach(([key, value]) => {
      comment[key] = value;
    });
    await comment.save();
    return comment;
  }
}
