import { Logger } from '@nestjs/common';

import { MachineStatus } from '../../../commons/enums';
import { IEvent } from '../interfaces/event.interface';

export class LowStockWarningEvent implements IEvent {
  private readonly logger: Logger = new Logger(LowStockWarningEvent.name);

  constructor(
    private readonly _machineId: string,
    private readonly _stock: number,
  ) {
    this.logger.log(
      `${LowStockWarningEvent.name} emitted. machineId: ${_machineId}, stock: ${_stock}`,
    );
  }

  machineId(): string {
    return this._machineId;
  }

  type(): string {
    return MachineStatus.STOCK_WARNING;
  }

  getStockQuantity(): number {
    return this._stock;
  }
}
