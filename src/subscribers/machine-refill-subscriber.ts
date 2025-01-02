import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { MachineStatus } from '../commons/enums';
import { ISubscriber } from '../interfaces/subscriber.interface';
import { Machine } from '../machine';
import { MachineRefillEvent } from '../publishers/machine-refill-event';

@Injectable()
export class MachineRefillSubscriber implements ISubscriber {
  public machines: Machine[];

  constructor(machines: Machine[]) {
    this.machines = machines;
  }

  @OnEvent(MachineStatus.REFILL)
  handle(event: MachineRefillEvent): void {
    this.machines[2].refillStock(event.getRefillQuantity());
  }
}
