import { HydratedDocument } from 'mongoose';
import { User } from 'src/user/user.schema';

export class ResetPasswordEvent {
  user: HydratedDocument<User>;

  constructor(user: HydratedDocument<User>) {
    this.user = user;
  }
}
