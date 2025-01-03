import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { IEvent } from './modules/machine/interfaces/event.interface';
import { IPublishSubscribeService } from './modules/machine/interfaces/publish-subscribe-service.interface';

@Injectable()
export class AppService implements IPublishSubscribeService {
  constructor(private eventEmitter: EventEmitter2) {}

  publish(event: IEvent): void {
    this.eventEmitter.emit(event.type(), event);
  }

  subscribe(type: string, handler: any) {
    throw new Error('Method not implemented.');
  }

  unsubscribe(type: string, handler?: any) {
    throw new Error('Method not implemented.');
  }
}
