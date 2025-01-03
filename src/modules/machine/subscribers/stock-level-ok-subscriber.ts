import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { StockLevelOkEvent } from '../events/stock-level-ok-event';

@EventsHandler(StockLevelOkEvent)
export class StockLevelOkSubscriber
  implements IEventHandler<StockLevelOkEvent>
{
  private readonly logger: Logger = new Logger(StockLevelOkSubscriber.name);

  handle(event: StockLevelOkEvent): void {
    this.logger.log(
      `Stock level OK for machine ${event.machineId()}: ${event.getStockQuantity()} units`,
    );
  }
}
