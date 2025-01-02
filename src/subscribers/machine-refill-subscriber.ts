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
    const quantity: number = event.getRefillQuantity();
    const machine: Machine = this.machines[2];

    machine.refillStock(quantity);
    const stockLevel: number = machine.getStockLevel();

    console.log(
      `Machine ${event.machineId()}, refilled ${quantity}. Remaining stock: ${stockLevel}.`,
    );
  }
}
