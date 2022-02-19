import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserRegisteredEvent } from '../events';

@Injectable()
export class UserRegisteredListener {
  @OnEvent('user.registered')
  handleUserRegisteredEvent(event: UserRegisteredEvent) {}
}
