import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { MachineStatus } from '../commons/enums';
import { ISubscriber } from '../interfaces/subscriber.interface';
import { Machine } from '../machine';
import { MachineRefillEvent } from '../publishers/machine-refill-event';

@Injectable()
export class MachineRefillSubscriber implements ISubscriber {
  public machines: Map<string, Machine>;

  constructor(machines: Machine[]) {
    this.machines = new Map(
      machines.map((machine: Machine): [string, Machine] => [
        machine.getId(),
        machine,
      ]),
    );
  }

  @OnEvent(MachineStatus.REFILL)
  handle(event: MachineRefillEvent): void {
    const quantity: number = event.getRefillQuantity();
    const machine: Machine | undefined = this.machines.get(event.machineId());

    if (!machine) {
      throw new Error(`Machine with ID ${event.machineId()} not found.`);
    }

    machine.refillStock(quantity);
    const stockLevel: number = machine.getStockLevel();

    console.log(
      `Machine ${event.machineId()}, refilled ${quantity}. Remaining stock: ${stockLevel}.`,
    );
  }
}
