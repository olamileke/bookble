import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './book.schema';
import { HydratedDocument, Model, Types } from 'mongoose';
import { User } from 'src/user/user.schema';
import { UpdateBookDto } from './dto';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private book: Model<BookDocument>) {}

  async findOne(filter: { [key: string]: string }) {
    return await this.book.findOne(filter);
  }

  async find(
    filter: { [key: string]: string },
    skip: number = 1,
    limit: number = 10,
  ) {
    const books = await this.book.find(filter).skip(skip).limit(limit);
    const pagination = await this.getPagination(filter, skip, limit);
    return { books, pagination };
  }

  async getPagination(
    filter: { [key: string]: string },
    skip: number,
    limit: number,
  ) {
    const total = await this.book.countDocuments(filter);
    const lastPage = Math.ceil(total / limit);
    const currentPage = skip / limit + 1;
    return { currentPage, lastPage };
  }

  async create(user: HydratedDocument<User>, bookDto: Book) {
    const book = await this.book.create({
      ...bookDto,
      _id: new Types.ObjectId(),
      author: user._id,
    });
    return book;
  }

  async update(book: HydratedDocument<Book>, body: UpdateBookDto) {
    Object.entries(body).forEach(([key, value]) => {
      book[key] = value;
    });
    await book.save();
    return book;
  }

  async delete(book: HydratedDocument<Book>) {
    return await book.softDelete();
  }
}
