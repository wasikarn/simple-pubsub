import { Injectable } from '@nestjs/common';

import { EventType } from '../../commons/enums';
import { IEvent } from '../../interfaces/event.interface';

@Injectable()
export class MachineSaleEvent implements IEvent {
  constructor(
    private readonly _sold: number,
    private readonly _machineId: string,
  ) {}

  machineId(): string {
    return this._machineId;
  }

  type(): string {
    return EventType.SALE;
  }

  getSoldQuantity(): number {
    return this._sold;
  }
}
