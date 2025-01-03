import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';

import { MachineRefillEvent } from '../events/machine-refill-event';
import { StockLevelOkEvent } from '../events/stock-level-ok-event';
import { Machine, MachineDocument, MachineModel } from '../machine';

@EventsHandler(MachineRefillEvent)
export class MachineRefillSubscriber
  implements IEventHandler<MachineRefillEvent>
{
  constructor(@InjectModel(Machine.name) private machineModel: MachineModel) {}

  async handle(event: MachineRefillEvent): Promise<void> {
    const machine: MachineDocument | null = await this.machineModel.findOne({
      id: event.machineId(),
    });

    if (!machine) return;

    machine.refillStock(event.getRefillQuantity());

    if (machine.stockLevel >= machine.threshold) {
      console.log('Stock level ok, emitting StockLevelOkEvent');

      new StockLevelOkEvent(machine.id, machine.stockLevel);
    }

    await machine.save();
  }
}
