import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { MachineStatus } from '../commons/enums';
import { ISubscriber } from '../interfaces/subscriber.interface';
import { Machine } from '../machine';
import { MachineSaleEvent } from '../publishers/machine-sale-event';

@Injectable()
export class MachineSaleSubscriber implements ISubscriber {
  public machines: Map<string, Machine>;

  constructor(machines: Machine[]) {
    this.machines = new Map(
      machines.map((machine: Machine): [string, Machine] => [
        machine.getId(),
        machine,
      ]),
    );
  }

  @OnEvent(MachineStatus.SALE)
  handle(event: MachineSaleEvent): void {
    const quantity: number = event.getSoldQuantity();
    const machine: Machine | undefined = this.machines.get(event.machineId());

    if (!machine) {
      throw new Error(`Machine with ID ${event.machineId()} not found.`);
    }

    machine.reduceStock(quantity);
    const stockLevel: number = machine.getStockLevel();

    console.log(
      `Machine ${event.machineId()}, sold ${quantity}. Remaining stock: ${stockLevel}.`,
    );
  }
}
