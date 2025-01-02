import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { MachineEventType } from '../../commons/enums';
import { ISubscriber } from '../../interfaces/subscriber.interface';
import { LowStockWarningEvent } from '../publishers/low-stock-warning-event';

@Injectable()
export class LowStockWarningSubscriber implements ISubscriber {
  @OnEvent(MachineEventType.LOW_STOCK_WARNING)
  handle(event: LowStockWarningEvent): void {
    console.log(event);
  }
}
