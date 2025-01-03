import { IEvent } from './event.interface';

export interface ISubscriber {
  handle(event: IEvent): void;
}
