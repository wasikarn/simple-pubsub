import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { machines } from '../../../commons/constants';
import { InventoryState } from '../../../commons/enums';
import { Machine } from '../entities/machine.entity';
import { MachineRefillEvent } from '../events/machine-refill-event';
import { StockLevelOkEvent } from '../events/stock-level-ok-event';
import { ISubscriber } from '../interfaces/subscriber.interface';
import { PublishSubscribeService } from '../services/publish-subscribe.service';

@Injectable()
export class MachineRefillSubscriber implements ISubscriber {
  private readonly logger: Logger = new Logger(MachineRefillSubscriber.name);

  constructor(private readonly pubSubService: PublishSubscribeService) {}

  @OnEvent(InventoryState.REFILL)
  handle(event: MachineRefillEvent): void {
    const machine: Machine | undefined = machines.find(
      (machine: Machine): boolean => machine.id === event.machineId(),
    );

    if (!machine) {
      throw new NotFoundException();
    }

    machine.stockLevel += event.getRefillQuantity();

    if (machine.isStockSufficient()) {
      this.pubSubService.publish(
        new StockLevelOkEvent(machine.id, machine.stockLevel),
      );
    }

    this.logger.log(
      `Machine refill event handled. machineId: ${machine.id}, stock: ${machine.stockLevel} units`,
    );
  }
}
