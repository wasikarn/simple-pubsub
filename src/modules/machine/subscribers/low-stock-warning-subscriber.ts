import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { InventoryState } from '../../../commons/enums';
import { LowStockWarningEvent } from '../events/low-stock-warning-event';
import { ISubscriber } from '../interfaces/subscriber.interface';

@Injectable()
export class LowStockWarningSubscriber implements ISubscriber {
  private readonly logger: Logger = new Logger(LowStockWarningSubscriber.name);

  @OnEvent(InventoryState.STOCK_WARNING)
  handle(event: LowStockWarningEvent): void {
    const machineId: string = event.machineId();
    const quantity: number = event.getStockQuantity();

    this.logger.warn(
      `Low stock warning for machine ${machineId}: ${quantity} units left.`,
    );
  }
}
