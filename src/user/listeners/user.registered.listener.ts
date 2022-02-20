import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MailService } from 'src/mail/mail.service';
import { UserRegisteredEvent } from '../events';

@Injectable()
export class UserRegisteredListener {
  constructor(private mailService: MailService) {}

  @OnEvent('user.registered')
  async handleUserRegisteredEvent(event: UserRegisteredEvent) {
    await this.mailService.handleUserRegisteredMail(event.user);
  }
}
