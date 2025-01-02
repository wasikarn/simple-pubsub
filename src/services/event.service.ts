import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { IEvent } from '../interfaces/event.interface';
import { IPublishSubscribeService } from '../interfaces/publish-subscribe-service.interface';
import { ISubscriber } from '../interfaces/subscriber.interface';

@Injectable()
export class EventService implements IPublishSubscribeService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  publish(event: IEvent): void {
    this.eventEmitter.emit(event.type(), event);

    console.log(`Event of type "${event.type()}" has been published.`);
  }

  subscribe(type: string, handler: ISubscriber): void {
    this.eventEmitter.on(type, (event: IEvent): void => handler.handle(event));

    console.log(`Subscriber registered for event type: ${type}`);
  }

  unsubscribe(type: string, handler?: ISubscriber): void {
    return handler
      ? this.unsubscribeHandler(type, handler)
      : this.unsubscribeAll(type);
  }

  private unsubscribeHandler(type: string, handler: ISubscriber): void {
    this.eventEmitter.off(type, handler.handle);

    console.log(`Unsubscribed specific handler from event type: ${type}`);
  }

  private unsubscribeAll(type: string): void {
    this.eventEmitter.removeAllListeners(type);

    console.log(`All handlers unsubscribed from event: ${type}`);
  }
}
