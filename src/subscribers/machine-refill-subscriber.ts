import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { MachineStatus } from '../commons/enums';
import { ISubscriber } from '../interfaces/subscriber.interface';
import { MachineRefillEvent } from '../publishers/machine-refill-event';

@Injectable()
export class MachineRefillSubscriber implements ISubscriber {
  @OnEvent(MachineStatus.REFILL)
  handle(event: MachineRefillEvent): void {
    console.log(event);
  }
}
