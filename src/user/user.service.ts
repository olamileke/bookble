import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private user: Model<UserDocument>) {}

  async find(filter: { [key: string]: string }) {
    return await this.user.findOne(filter);
  }

  async create(user: User) {
    user.password = await bcrypt.hash(user.password, 10);
    return await this.user.create(user);
  }
}
