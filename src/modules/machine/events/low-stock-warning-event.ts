import { Logger } from '@nestjs/common';

import { Events } from '../../../commons/constants';
import { IEvent } from '../interfaces/event.interface';

export class LowStockWarningEvent implements IEvent {
  private readonly logger: Logger = new Logger(LowStockWarningEvent.name);

  constructor(
    private readonly _machineId: string,
    private readonly stock: number,
  ) {
    this.logger.log(
      `${LowStockWarningEvent.name} emitted. machineId: ${_machineId}, stock: ${stock}`,
    );
  }

  machineId(): string {
    return this._machineId;
  }

  type(): string {
    return Events.LOW_STOCK_WARNING;
  }

  getStockQuantity(): number {
    return this.stock;
  }
}
