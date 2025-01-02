import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { ISubscriber } from '../../interfaces/subscriber.interface';
import { MachineRefillEvent } from '../publishers/machine-refill-event';

@Injectable()
export class MachineRefillSubscriber implements ISubscriber {
  @OnEvent('machine.refill')
  handle(event: MachineRefillEvent): void {
    console.log(event);
  }
}
