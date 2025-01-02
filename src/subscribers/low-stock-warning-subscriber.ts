import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { MachineStatus } from '../commons/enums';
import { ISubscriber } from '../interfaces/subscriber.interface';
import { LowStockWarningEvent } from '../publishers/low-stock-warning-event';

@Injectable()
export class LowStockWarningSubscriber implements ISubscriber {
  @OnEvent(MachineStatus.LOW_STOCK_WARNING)
  handle(event: LowStockWarningEvent): void {
    console.log(event);
  }
}
