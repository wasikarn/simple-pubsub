import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { MachineStatus } from '../commons/enums';
import { MachineSaleEvent } from '../events/machine-sale-event';
import { ISubscriber } from '../interfaces/subscriber.interface';
import { Machine } from '../machine';

@Injectable()
export class MachineSaleSubscriber implements ISubscriber {
  public machines: Machine[];

  constructor(machines: Machine[]) {
    this.machines = machines;
  }

  @OnEvent(MachineStatus.SALE)
  handle(event: MachineSaleEvent): void {
    const quantity: number = event.getSoldQuantity();
    const indexOfMachine: number = this.machines.findIndex(
      (machine: Machine): boolean => machine.getId() === event.machineId(),
    );
    const machine: Machine = this.machines[indexOfMachine];

    machine.reduceStock(quantity);
    const stockLevel: number = machine.getStockLevel();

    console.log(
      `Machine ${event.machineId()}, sold ${quantity}. Remaining stock: ${stockLevel}.`,
    );
  }
}
