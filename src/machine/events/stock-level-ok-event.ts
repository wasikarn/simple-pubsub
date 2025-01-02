import { Injectable } from '@nestjs/common';

import { EventType } from '../../commons/enums';
import { IEvent } from '../../interfaces/event.interface';

@Injectable()
export class StockLevelOkEvent implements IEvent {
  constructor(private readonly _machineId: string) {}

  machineId(): string {
    return this._machineId;
  }

  type(): string {
    return EventType.STOCK_LEVEL_OK;
  }
}
