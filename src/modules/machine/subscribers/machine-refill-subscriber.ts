import { Logger, NotFoundException } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';

import { MachineRefillEvent } from '../events/machine-refill-event';
import { StockLevelOkEvent } from '../events/stock-level-ok-event';
import { Machine, MachineDocument, MachineModel } from '../machine';

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

    if (machine.stockLevel >= machine.threshold) {
      this.logger.log('Stock level ok, emitting StockLevelOkEvent');

      new StockLevelOkEvent(machine.id, machine.stockLevel);
    }

    await machine.save();
  }
}
