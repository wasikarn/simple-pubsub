import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { LowStockWarningEvent } from '../events/low-stock-warning-event';

@EventsHandler(LowStockWarningEvent)
export class LowStockWarningSubscriber
  implements IEventHandler<LowStockWarningEvent>
{
  handle(event: LowStockWarningEvent): void {
    const machineId: string = event.machineId();
    const quantity: number = event.getStockQuantity();

    console.log(
      `Low stock warning for machine ${machineId}: ${quantity} units left.`,
    );
  }
}
