import { HydratedDocument } from 'mongoose';
import { User } from 'src/user/user.schema';

export class VerifyDeviceEvent {
  user: HydratedDocument<User>;

  constructor(user: HydratedDocument<User>) {
    this.user = user;
  }
}
