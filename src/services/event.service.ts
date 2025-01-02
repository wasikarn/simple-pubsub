import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { IEvent } from '../interfaces/event.interface';
import { IPublishSubscribeService } from '../interfaces/publish-subscribe-service.interface';
import { ISubscriber } from '../interfaces/subscriber.interface';

type SubscriberCollection = Set<ISubscriber>;
type SubscriberMap = Map<string, SubscriberCollection>;

@Injectable()
export class EventService implements IPublishSubscribeService {
  private readonly listeners: SubscriberMap = new Map();

  constructor(private readonly eventEmitter: EventEmitter2) {}

  publish(event: IEvent): void {
    const eventType: string = event.type();

    this.eventEmitter.emit(eventType, event);

    console.log(`Event published: ${eventType}`);
  }

  subscribe(type: string, handler: ISubscriber): void {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set<ISubscriber>());
    }

    const subscribers: SubscriberCollection | undefined =
      this.listeners.get(type);

    if (subscribers) {
      subscribers.add(handler);
    }

    this.eventEmitter.on(type, (event: IEvent): void => handler.handle(event));

    console.log(`Subscribed to event: ${type}`);
  }

  unsubscribe(type: string, handler?: ISubscriber): void {
    const subscribers: SubscriberCollection | undefined =
      this.listeners.get(type);

    if (!subscribers) {
      console.warn(`No subscribers found for event: ${type}`);

      return;
    }

    if (handler) {
      this.unsubscribeHandler(type, handler, subscribers);

      return;
    }

    this.unsubscribeAll(type, subscribers);
  }

  private unsubscribeHandler(
    type: string,
    handler: ISubscriber,
    subscribers: SubscriberCollection,
  ): void {
    if (!subscribers.has(handler)) {
      console.warn(`Handler not found for event: ${type}`);

      return;
    }

    subscribers.delete(handler);
    this.eventEmitter.off(type, handler.handle);
    console.log(`Unsubscribed handler from event: ${type}`);
  }

  private unsubscribeAll(
    type: string,
    subscribers: SubscriberCollection,
  ): void {
    subscribers.forEach((subscriber: ISubscriber): void => {
      this.eventEmitter.off(type, subscriber.handle);
    });
    subscribers.clear();
    console.log(`All handlers unsubscribed from event: ${type}`);
  }
}
