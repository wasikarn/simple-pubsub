import { IEvent as IEventCqrs } from '@nestjs/cqrs';

export interface IEvent extends IEventCqrs {
  machineId(): string;
  type(): string;
}
