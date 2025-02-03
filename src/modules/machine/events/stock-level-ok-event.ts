import { Logger } from '@nestjs/common';

import { Events } from '../../../commons/constants';
import { IEvent } from '../interfaces/event.interface';

export class StockLevelOkEvent implements IEvent {
  private readonly logger: Logger = new Logger(StockLevelOkEvent.name);

  constructor(
    private readonly _machineId: string,
    private readonly stock: number,
  ) {
    this.logger.log(
      `${StockLevelOkEvent.name} emitted. machineId: ${_machineId}, stock: ${stock}`,
    );
  }

  machineId(): string {
    return this._machineId;
  }

  type(): string {
    return Events.STOCK_LEVEL_OK;
  }

  getStockQuantity(): number {
    return this.stock;
  }
}
