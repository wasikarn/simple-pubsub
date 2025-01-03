import { Logger, NotFoundException } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';

import {
  Machine,
  MachineDocument,
  MachineModel,
} from '../entities/machine.entity';
import { LowStockWarningEvent } from '../events/low-stock-warning-event';
import { MachineSaleEvent } from '../events/machine-sale-event';

@EventsHandler(MachineSaleEvent)
export class MachineSaleSubscriber implements IEventHandler<MachineSaleEvent> {
  private readonly logger: Logger = new Logger(MachineSaleSubscriber.name);

  constructor(@InjectModel(Machine.name) private machineModel: MachineModel) {}

  async handle(event: MachineSaleEvent): Promise<void> {
    const machine: MachineDocument | null = await this.machineModel.findOne({
      _id: event.machineId(),
    });

    if (!machine) {
      throw new NotFoundException(
        `Machine with id ${event.machineId()} not found`,
      );
    }

    machine.stockLevel -= event.getSoldQuantity();

    if (machine.stockLevel < machine.threshold && !machine.lowStock) {
      machine.lowStock = true;

      this.logger.log(
        'Stock dropped below threshold, emitting LowStockWarningEvent',
      );

      new LowStockWarningEvent(machine.id, machine.stockLevel);
    }

    await machine.save();
  }
}
