import { Injectable, Logger } from '@nestjs/common';

import { StockLevelOkEvent } from '../events/stock-level-ok-event';
import { ISubscriber } from '../interfaces/subscriber.interface';

@Injectable()
export class StockLevelOkSubscriber implements ISubscriber {
  private readonly logger: Logger = new Logger(StockLevelOkSubscriber.name);

  handle(event: StockLevelOkEvent): void {
    this.logger.log(
      `Stock level OK for machine ${event.machineId()}: ${event.getStockQuantity()} units`,
    );
  }
}
