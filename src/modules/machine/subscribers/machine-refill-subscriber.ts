import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { Machine } from '../entities/machine.entity';
import { MachineRefillEvent } from '../events/machine-refill-event';
import { StockLevelOkEvent } from '../events/stock-level-ok-event';
import { ISubscriber } from '../interfaces/subscriber.interface';

@Injectable()
export class MachineRefillSubscriber implements ISubscriber {
  private readonly logger: Logger = new Logger(MachineRefillSubscriber.name);

  constructor(private readonly machines: Machine[]) {}

  async handle(event: MachineRefillEvent): Promise<void> {
    const machine: Machine | undefined = this.machines.find(
      (machine: Machine): boolean => machine.id === event.machineId(),
    );

    if (!machine) {
      throw new NotFoundException();
    }

    machine.stockLevel += event.getRefillQuantity();

    if (this.isStockLevelOk(machine)) {
      machine.stockLevelOkEmitted = true;
      new StockLevelOkEvent(machine.id, machine.stockLevel);
      this.logger.log(
        `Stock level OK for machine ${machine.id}: ${machine.stockLevel} units`,
      );
    }

    if (this.needsRefill(machine)) {
      machine.lowStockWarningEmitted = false;
    }

    this.logger.log('Machine refill event handled.');
  }

  private needsRefill(machine: Machine) {
    return machine.stockLevel < machine.threshold;
  }

  private isStockLevelOk(machine: Machine) {
    return (
      machine.stockLevel >= machine.threshold && !machine.stockLevelOkEmitted
    );
  }
}
