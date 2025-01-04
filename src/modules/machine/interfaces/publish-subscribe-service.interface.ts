import { IEvent } from './event.interface';
import { ISubscriber } from './subscriber.interface';

export interface IPublishSubscribeService {
  publish(event: IEvent): void;
  subscribe(type: string, handler: ISubscriber): void;
  unsubscribe(): void;
}
