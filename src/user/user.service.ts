import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto';
import { generateRandomToken } from 'src/utilities';
import { Request } from 'express';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private user: Model<UserDocument>) {}

  async findOne(filter: { [key: string]: string }) {
    return await this.user.findOne(filter);
  }

  async create(user: User, request: Request) {
    user._id = new Types.ObjectId();
    user.email_verification_token = generateRandomToken();
    user.password = await bcrypt.hash(user.password, 10);
    user.devices = [request.headers['user-agent']];
    return await this.user.create({ ...user, is_admin: true });
  }

  async update(
    user: HydratedDocument<User>,
    body: UpdateUserDto,
    verify_email?: boolean,
  ) {
    if (verify_email && user.email_verification_token) {
      delete user.email_verification_token;
    }
    Object.entries(body).forEach(async ([key, value]) => {
      user[key] = key === 'password' ? await bcrypt.hash(value, 10) : value;
    });
    await user.save();
    return user;
  }

  async generateDeviceVerification(
    user: HydratedDocument<User>,
    device: string,
  ) {
    const code = generateRandomToken(8, true);
    const expires_at = new Date(Date.now() + 900000);
    user.device_verification = { code, expires_at, device };
    await user.save();
    return user;
  }

  async generatePasswordReset(user: HydratedDocument<User>) {
    const expires_at = new Date(Date.now() + 30 * 60 * 1000);
    const token = generateRandomToken(120);
    user.password_reset = { token, expires_at };
    await user.save();
    return user;
  }
}
