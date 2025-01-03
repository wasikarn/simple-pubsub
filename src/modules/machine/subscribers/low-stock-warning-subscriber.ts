import { Injectable } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OnEvent } from '@nestjs/event-emitter';

import { MachineStatus } from '../../../commons/enums';
import { LowStockWarningEvent } from '../events/low-stock-warning-event';
import { Machine } from '../machine';

@EventsHandler(LowStockWarningEvent)
@Injectable()
export class LowStockWarningSubscriber
  implements IEventHandler<LowStockWarningEvent>
{
  public machines: Machine[];

  constructor(machines: Machine[]) {
    this.machines = machines;
  }

  @OnEvent(MachineStatus.STOCK_WARNING)
  handle(event: LowStockWarningEvent): void {
    const quantity: number = event.getStockQuantity();
    const indexOfMachine: number = this.machines.findIndex(
      (machine: Machine): boolean => machine.getId() === event.machineId(),
    );
    const machine: Machine = this.machines[indexOfMachine];
    const stockLevel: number = machine.getStockLevel();

    console.log(
      `Machine ${event.machineId()}, ${quantity} left. Remaining stock: ${stockLevel}.`,
    );
  }
}
