import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { IEvent } from '../interfaces/event.interface';

@Injectable()
export class PublishSubscribeService {
  constructor(private eventEmitter: EventEmitter2) {}

  publish(event: IEvent): void {
    this.eventEmitter.emit(event.type(), event);
  }
}
