import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { IEvent } from '../interfaces/event.interface';
import { IPublishSubscribeService } from '../interfaces/publish-subscribe-service.interface';
import { ISubscriber } from '../interfaces/subscriber.interface';

@Injectable()
export class PublishSubscribeService implements IPublishSubscribeService {
  constructor(private eventEmitter: EventEmitter2) {}

  publish(event: IEvent): void {
    this.eventEmitter.emit(event.type(), event);
  }

  subscribe(type: string, handler: ISubscriber): void {
    this.eventEmitter.on(type, handler.handle);
  }

  unsubscribe(type: string, handler: ISubscriber): void {
    this.eventEmitter.off(type, handler.handle);
  }
}
