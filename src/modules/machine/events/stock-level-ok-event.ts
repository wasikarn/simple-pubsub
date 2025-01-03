import { Logger } from '@nestjs/common';

import { MachineStatus } from '../../../commons/enums';
import { IEvent } from '../interfaces/event.interface';

export class StockLevelOkEvent implements IEvent {
  private readonly logger: Logger = new Logger(StockLevelOkEvent.name);

  constructor(
    private readonly _machineId: string,
    private readonly _stock: number,
  ) {
    this.logger.log(
      `${StockLevelOkEvent.name} emitted. machineId: ${_machineId}, stock: ${_stock}`,
    );
  }

  machineId(): string {
    return this._machineId;
  }

  type(): string {
    return MachineStatus.STOCK_OK;
  }

  getStockQuantity(): number {
    return this._stock;
  }
}
