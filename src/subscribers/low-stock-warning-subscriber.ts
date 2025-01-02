import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { MachineStatus } from '../commons/enums';
import { ISubscriber } from '../interfaces/subscriber.interface';
import { Machine } from '../machine';
import { LowStockWarningEvent } from '../publishers/low-stock-warning-event';

@Injectable()
export class LowStockWarningSubscriber implements ISubscriber {
  public machines: Machine[];

  constructor(machines: Machine[]) {
    this.machines = machines;
  }

  @OnEvent(MachineStatus.LOW_STOCK_WARNING)
  handle(event: LowStockWarningEvent): void {
    const quantity: number = event.getStockQuantity();
    const machine: Machine = this.machines[2];
    const stockLevel: number = machine.getStockLevel();

    console.log(
      `Machine ${event.machineId()}, ${quantity} left. Remaining stock: ${stockLevel}.`,
    );
  }
}
