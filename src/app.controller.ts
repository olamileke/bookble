import { Controller, Get } from '@nestjs/common';
import { UnguardedRoute } from './utilities';

@Controller()
export class AppController {
  constructor() {}

  @UnguardedRoute()
  @Get()
  index(): string {
    return 'Idk what you expected to find. I am an API.';
  }
}
