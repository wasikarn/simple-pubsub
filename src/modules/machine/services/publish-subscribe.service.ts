import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { IEvent } from '../interfaces/event.interface';
import { IPublishSubscribeService } from '../interfaces/publish-subscribe-service.interface';
import { ISubscriber } from '../interfaces/subscriber.interface';

@Injectable()
export class PublishSubscribeService
  implements IPublishSubscribeService, OnModuleDestroy
{
  constructor(private eventEmitter: EventEmitter2) {}

  publish(event: IEvent): void {
    this.eventEmitter.emit(event.type(), event);
  }

  /**
   * @deprecated Move to use decorator @OnEvent() for subscript event.
   */
  subscribe(type: string, handler: ISubscriber): void {
    this.eventEmitter.on(type, handler.handle);
  }

  unsubscribe(): void {
    this.eventEmitter.removeAllListeners();
  }

  onModuleDestroy(): void {
    this.unsubscribe();
  }
}
