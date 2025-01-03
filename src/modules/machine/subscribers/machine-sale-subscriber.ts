import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';

import { LowStockWarningEvent } from '../events/low-stock-warning-event';
import { MachineSaleEvent } from '../events/machine-sale-event';
import { Machine, MachineDocument, MachineModel } from '../machine';

@EventsHandler(MachineSaleEvent)
export class MachineSaleSubscriber implements IEventHandler<MachineSaleEvent> {
  constructor(@InjectModel(Machine.name) private machineModel: MachineModel) {}

  async handle(event: MachineSaleEvent): Promise<void> {
    const machine: MachineDocument | null = await this.machineModel.findOne({
      id: event.machineId(),
    });

    if (!machine) return;

    machine.reduceStock(event.getSoldQuantity());

    if (machine.stockLevel < machine.threshold) {
      console.log(
        'Stock dropped below threshold, emitting LowStockWarningEvent',
      );

      new LowStockWarningEvent(machine.id, machine.stockLevel);
    }

    await machine.save();
  }
}
