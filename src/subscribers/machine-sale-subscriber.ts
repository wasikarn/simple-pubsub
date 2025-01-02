import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { MachineStatus } from '../commons/enums';
import { ISubscriber } from '../interfaces/subscriber.interface';
import { Machine } from '../machine';
import { MachineSaleEvent } from '../publishers/machine-sale-event';

@Injectable()
export class MachineSaleSubscriber implements ISubscriber {
  public machines: Machine[];

  constructor(machines: Machine[]) {
    this.machines = machines;
  }

  @OnEvent(MachineStatus.SALE)
  handle(event: MachineSaleEvent): void {
    const quantity: number = event.getSoldQuantity();
    const machine: Machine = this.machines[2];

    machine.reduceStock(quantity);
    const stockLevel: number = machine.getStockLevel();

    console.log(
      `Machine ${event.machineId()}, sold ${quantity}. Remaining stock: ${stockLevel}.`,
    );
  }
}
