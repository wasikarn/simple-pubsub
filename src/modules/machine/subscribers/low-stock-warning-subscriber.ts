import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { LowStockWarningEvent } from '../events/low-stock-warning-event';

@EventsHandler(LowStockWarningEvent)
export class LowStockWarningSubscriber
  implements IEventHandler<LowStockWarningEvent>
{
  private readonly logger: Logger = new Logger(LowStockWarningSubscriber.name);

  handle(event: LowStockWarningEvent): void {
    const machineId: string = event.machineId();
    const quantity: number = event.getStockQuantity();

    this.logger.log(
      `Low stock warning for machine ${machineId}: ${quantity} units left.`,
    );
  }
}
