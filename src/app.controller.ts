import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { eventGenerator } from './commons/helpers';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  run(): void {
    Array(5)
      .fill(undefined)
      .forEach((): void => eventGenerator(this.appService));
  }
}
