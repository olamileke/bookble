import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MailService } from 'src/mail/mail.service';
import { VerifyDeviceEvent } from '../events';

@Injectable()
export class VerifyDeviceListener {
  constructor(private mailService: MailService) {}

  @OnEvent('verify.device')
  async handleVerifyDeviceEvent(event: VerifyDeviceEvent) {
    await this.mailService.handleVerifyDeviceMail(event.user);
  }
}
