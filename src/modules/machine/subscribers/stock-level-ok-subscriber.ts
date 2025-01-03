import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { MachineStatus } from '../../../commons/enums';
import { StockLevelOkEvent } from '../events/stock-level-ok-event';
import { ISubscriber } from '../interfaces/subscriber.interface';
import { Machine } from '../machine';

@Injectable()
export class StockLevelOkSubscriber implements ISubscriber {
  public machines: Machine[];

  constructor(machines: Machine[]) {
    this.machines = machines;
  }

  @OnEvent(MachineStatus.STOCK_OK)
  handle(event: StockLevelOkEvent): void {
    const indexOfMachine: number = this.machines.findIndex(
      (machine: Machine): boolean => machine.getId() === event.machineId(),
    );
    const machine: Machine = this.machines[indexOfMachine];
    const stockLevel: number = machine.getStockLevel();

    console.log(
      `Machine ${event.machineId()}, Stock level ok. Remaining stock: ${stockLevel}.`,
    );
  }
}
