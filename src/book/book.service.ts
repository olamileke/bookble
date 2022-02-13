import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './book.schema';
import { HydratedDocument, Model, Types } from 'mongoose';
import { User } from 'src/user/user.schema';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private book: Model<BookDocument>) {}

  async findOne(filter: { [key: string]: string }) {
    return await this.book.findOne({ filter });
  }

  async create(user: HydratedDocument<User>, bookDto: Book) {
    const book = await this.book.create({
      ...bookDto,
      _id: new Types.ObjectId(),
      author: user._id,
    });
    return book;
  }

  async delete(_id: string) {
    await this.book.deleteOne({ _id });
  }
}
