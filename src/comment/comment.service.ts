import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './comment.schema';
import { HydratedDocument, Model } from 'mongoose';
import { Book } from 'src/book/book.schema';
import { User } from 'src/user/user.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private comment: Model<CommentDocument>,
  ) {}

  async findOne(filter: { [key: string]: string }) {
    return this.comment.findOne(filter);
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
}
