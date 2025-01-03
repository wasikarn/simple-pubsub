import { Controller, Get } from '@nestjs/common';

import { eventGenerator } from './commons/helpers';
import { IEvent } from './modules/machine/interfaces/event.interface';
import { PublishSubscribeService } from './modules/machine/publish-subscribe.service';

@Controller()
export class AppController {
  constructor(private readonly pubSubService: PublishSubscribeService) {}

  @Get()
  run(): void {
    const events: IEvent[] = Array(5)
      .fill(undefined)
      .map((): IEvent => eventGenerator());

    events.map((event: IEvent): void => this.pubSubService.publish(event));
  }
}
