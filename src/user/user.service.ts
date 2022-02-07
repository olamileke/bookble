import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private user: Model<UserDocument>) {}

  async find(filter: { [key: string]: string }) {
    return await this.user.findOne(filter);
  }

  async create(user: User) {
    user._id = new Types.ObjectId();
    user.password = await bcrypt.hash(user.password, 10);
    return await this.user.create(user);
  }

  async update(
    user: HydratedDocument<User>,
    body: UpdateUserDto,
    verify_email?: boolean,
  ) {
    if (verify_email && !user.email_verified_at) {
      user.email_verified_at = new Date();
    }
    Object.entries(body).forEach(async ([key, value]) => {
      user[key] = key === 'password' ? await bcrypt.hash(value, 10) : value;
    });
    await user.save();
    return user;
  }
}
