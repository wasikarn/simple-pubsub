import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';

import { IEvent } from './interfaces/event.interface';

@Injectable()
export class PublishSubscribeService {
  constructor(private readonly eventBus: EventBus) {}

  publish(event: IEvent): void {
    this.eventBus.publish(event);
  }
}
