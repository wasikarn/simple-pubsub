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

    machine.stockLevel -= event.getSoldQuantity();

    if (machine.isLowerStock()) {
      this.pubSubService.publish(
        new LowStockWarningEvent(machine.id, machine.stockLevel),
      );
    }

    this.logger.log(
      `Machine sale event handled. machineId: ${machine.id}, stock: ${machine.stockLevel} units`,
    );
  }
}
