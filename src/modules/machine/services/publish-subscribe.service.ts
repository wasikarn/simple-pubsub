import { Injectable } from '@nestjs/common';

import { IEvent } from '../interfaces/event.interface';
import { IPublishSubscribeService } from '../interfaces/publish-subscribe-service.interface';
import { ISubscriber } from '../interfaces/subscriber.interface';

@Injectable()
export class PublishSubscribeService implements IPublishSubscribeService {
  private subscribers = new Map<string, ISubscriber[]>();

  publish(event: IEvent): void {
    const handlers: ISubscriber[] = this.subscribers.get(event.type()) || [];

    handlers.forEach((handler: ISubscriber): void => handler.handle(event));
  }

  subscribe(type: string, handler: ISubscriber): void {
    if (!this.subscribers.has(type)) {
      this.subscribers.set(type, []);
    }

    this.subscribers.get(type)?.push(handler);
  }

  unsubscribe(type: string, handler?: ISubscriber): void {
    if (!handler) {
      this.subscribers.delete(type);

      return;
    }

    const handlers: ISubscriber[] = this.subscribers.get(type) || [];

    this.subscribers.set(
      type,
      handlers.filter((h: ISubscriber): boolean => h !== handler),
    );
  }
}
