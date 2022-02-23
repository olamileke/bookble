import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MailService } from 'src/mail/mail.service';
import { ResetPasswordEvent } from '../events';

@Injectable()
export class ResetPasswordListener {
  constructor(private mailService: MailService) {}

  @OnEvent('reset.password')
  async handleResetPasswordEvent(event: ResetPasswordEvent) {
    await this.mailService.handleResetPasswordMail(event.user);
  }
}
