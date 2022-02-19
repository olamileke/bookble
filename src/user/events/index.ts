import { HydratedDocument } from 'mongoose';
import { User } from '../user.schema';

export class UserRegisteredEvent {
  event: {
    user: HydratedDocument<User>;
  };
}
