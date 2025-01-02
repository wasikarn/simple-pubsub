import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { eventGenerator } from './commons/helpers';
import { IEvent } from './interfaces/event.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  run(): void {
    const events: IEvent[] = Array(5)
      .fill(undefined)
      .map((): IEvent => eventGenerator());

    events.map((event: IEvent): void => this.appService.publish(event));
  }
}
