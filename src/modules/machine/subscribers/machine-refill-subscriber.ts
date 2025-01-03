import { Logger, NotFoundException } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';

import {
  Machine,
  MachineDocument,
  MachineModel,
} from '../entities/machine.entity';
import { MachineRefillEvent } from '../events/machine-refill-event';
import { StockLevelOkEvent } from '../events/stock-level-ok-event';

@EventsHandler(MachineRefillEvent)
export class MachineRefillSubscriber
  implements IEventHandler<MachineRefillEvent>
{
  private readonly logger: Logger = new Logger(MachineRefillSubscriber.name);

  constructor(@InjectModel(Machine.name) private machineModel: MachineModel) {}

  async handle(event: MachineRefillEvent): Promise<void> {
    const machine: MachineDocument | null = await this.machineModel.findOne({
      _id: event.machineId(),
    });

    if (!machine) {
      throw new NotFoundException(
        `Machine with id ${event.machineId()} not found`,
      );
    }

    machine.stockLevel += event.getRefillQuantity();

    if (machine.stockLevel >= machine.threshold && machine.lowStock) {
      machine.lowStock = false;

      this.logger.log('Stock level ok, emitting StockLevelOkEvent');

      new StockLevelOkEvent(machine.id, machine.stockLevel);
    }

    await machine.save();
  }
}
