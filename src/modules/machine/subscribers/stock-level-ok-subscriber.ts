import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { StockLevelOkEvent } from '../events/stock-level-ok-event';

@EventsHandler(StockLevelOkEvent)
export class StockLevelOkSubscriber
  implements IEventHandler<StockLevelOkEvent>
{
  handle(event: StockLevelOkEvent): void {
    console.log(
      `Stock level OK for machine ${event.machineId()}: ${event.getStockQuantity()} units`,
    );
  }
}
