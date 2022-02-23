import { Injectable } from '@nestjs/common';
import { default as formData } from 'form-data';
import { bookbleConfig } from 'src/config';
import { User } from 'src/user/user.schema';
import { renderFile } from 'ejs';
import * as path from 'path';
import Mailgun from 'mailgun.js';

@Injectable()
export class MailService {
  async handleUserRegisteredMail(user: User) {
    const mailData = {
      from: bookbleConfig.mailFrom,
      to: user.email,
      subject: 'Bookble: Verify Your Email',
      html: '',
    };
    await this.sendMail(mailData, 'user.registered.html', {
      name: user.first_name,
      token: user.email_verification_token as string,
    });
  }

  async handleVerifyDeviceMail(user: User) {
    const mailData = {
      from: bookbleConfig.mailFrom,
      to: user.email,
      subject: 'Bookble: Verify Device',
      html: '',
    };
    await this.sendMail(mailData, 'verify.device.html', {
      name: user.first_name,
      code: user.device_verification.code,
      device: user.device_verification.device,
    });
  }

  sendMail(
    mailData: { [key: string]: string },
    template: string,
    templateOptions: { [key: string]: string },
  ) {
    const client = this.initClient();
    const templatePath = this.generateTemplatePath(template);
    renderFile(
      templatePath,
      {
        ...this.generateTemplateOptions({ ...templateOptions }),
      },
      (error, html) => {
        if (error) {
          throw error;
        }
        mailData.html = html;
        client.messages.create(bookbleConfig.mailDomain, mailData);
      },
    );
  }

  generateTemplatePath(template: string) {
    return path.join('src', 'utilities', 'templates', 'mail', template);
  }

  generateTemplateOptions(options: { [key: string]: string }) {
    const { appName, clientUrl } = bookbleConfig;
    return { appName, clientUrl, ...options };
  }

  initClient() {
    const mailgun = new (Mailgun as any)(formData);
    return mailgun.client({
      username: 'api',
      key: bookbleConfig.mailgunApiKey,
    });
  }
}
