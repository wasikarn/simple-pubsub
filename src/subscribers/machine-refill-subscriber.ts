import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { MachineStatus } from '../commons/enums';
import { MachineRefillEvent } from '../events/machine-refill-event';
import { ISubscriber } from '../interfaces/subscriber.interface';
import { Machine } from '../machine';

@Injectable()
export class MachineRefillSubscriber implements ISubscriber {
  public machines: Machine[];

  constructor(machines: Machine[]) {
    this.machines = machines;
  }

  @OnEvent(MachineStatus.REFILL)
  handle(event: MachineRefillEvent): void {
    const quantity: number = event.getRefillQuantity();
    const indexOfMachine: number = this.machines.findIndex(
      (machine: Machine): boolean => machine.getId() === event.machineId(),
    );
    const machine: Machine = this.machines[indexOfMachine];

    machine.refillStock(quantity);
    const stockLevel: number = machine.getStockLevel();

    console.log(
      `Machine ${event.machineId()}, refilled ${quantity}. Remaining stock: ${stockLevel}.`,
    );
  }
}
