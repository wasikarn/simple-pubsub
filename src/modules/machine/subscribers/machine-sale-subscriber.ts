import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { machines } from '../../../commons/constants';
import { InventoryState } from '../../../commons/enums';
import { Machine } from '../entities/machine.entity';
import { LowStockWarningEvent } from '../events/low-stock-warning-event';
import { MachineSaleEvent } from '../events/machine-sale-event';
import { ISubscriber } from '../interfaces/subscriber.interface';
import { PublishSubscribeService } from '../services/publish-subscribe.service';

@Injectable()
export class MachineSaleSubscriber implements ISubscriber {
  private readonly logger: Logger = new Logger(MachineSaleSubscriber.name);

  constructor(private readonly pubSubService: PublishSubscribeService) {}

  @OnEvent(InventoryState.SALE)
  handle(event: MachineSaleEvent): void {
    const machine: Machine | undefined = machines.find(
      (machine: Machine): boolean => machine.id === event.machineId(),
    );

    if (!machine) {
      throw new NotFoundException();
    }

    if (machine.isOutOfStock()) {
      this.logger.error(`Machine out of stock. machineId: ${machine.id}`);

      return;
    }

    machine.decrementStock(event.getSoldQuantity());

    if (machine.isLowerStock() && !machine.isLowStockWaring) {
      machine.isLowStockWaring = true;

      this.pubSubService.publish(
        new LowStockWarningEvent(machine.id, machine.stockLevel),
      );

      return;
    }

    this.logger.log(
      `Machine sale event handled. machineId: ${machine.id}, stock: ${machine.stockLevel} units`,
    );
  }
}
