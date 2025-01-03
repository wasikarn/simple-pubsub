import { Logger } from '@nestjs/common';

import { InventoryState } from '../../../commons/enums';
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
    return InventoryState.STOCK_OK;
  }

  getStockQuantity(): number {
    return this.stock;
  }
}
