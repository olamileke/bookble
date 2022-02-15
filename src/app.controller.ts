import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  index(): string {
    return 'Idk what you expected to find. I am an API. Continuous Deployment baby.';
  }
}
