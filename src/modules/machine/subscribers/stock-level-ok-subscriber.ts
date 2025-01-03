import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { InventoryState } from '../../../commons/enums';
import { StockLevelOkEvent } from '../events/stock-level-ok-event';
import { ISubscriber } from '../interfaces/subscriber.interface';

@Injectable()
export class StockLevelOkSubscriber implements ISubscriber {
  private readonly logger: Logger = new Logger(StockLevelOkSubscriber.name);

  @OnEvent(InventoryState.STOCK_OK)
  handle(event: StockLevelOkEvent): void {
    this.logger.log(
      `Stock level OK for machine ${event.machineId()}: ${event.getStockQuantity()} units`,
    );
  }
}
