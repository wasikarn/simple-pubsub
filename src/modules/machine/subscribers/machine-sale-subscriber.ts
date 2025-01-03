import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { Machine } from '../entities/machine.entity';
import { LowStockWarningEvent } from '../events/low-stock-warning-event';
import { MachineSaleEvent } from '../events/machine-sale-event';
import { ISubscriber } from '../interfaces/subscriber.interface';

@Injectable()
export class MachineSaleSubscriber implements ISubscriber {
  private readonly logger: Logger = new Logger(MachineSaleSubscriber.name);

  constructor(private readonly machines: Machine[]) {}

  handle(event: MachineSaleEvent): void {
    const machine: Machine | undefined = this.machines.find(
      (machine: Machine): boolean => machine.id === event.machineId(),
    );

    if (!machine) {
      throw new NotFoundException();
    }

    machine.stockLevel -= event.getSoldQuantity();

    if (this.isLowStockWarningNeeded(machine)) {
      machine.lowStockWarningEmitted = true;
      new LowStockWarningEvent(machine.id, machine.stockLevel);
      this.logger.log(
        `Low stock warning for machine ${machine.id}: ${machine.stockLevel} units left.`,
      );
    }

    if (this.isAvailableForSale(machine)) {
      machine.stockLevelOkEmitted = false;
    }

    this.logger.log('Machine sale event handled.');
  }

  private isAvailableForSale(machine: Machine) {
    return machine.stockLevel >= machine.threshold;
  }

  private isLowStockWarningNeeded(machine: Machine): boolean {
    return (
      machine.stockLevel < machine.threshold && !machine.lowStockWarningEmitted
    );
  }
}
