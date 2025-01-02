import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { ISubscriber } from '../../interfaces/subscriber.interface';
import { LowStockWarningEvent } from '../publishers/low-stock-warning-event';

@Injectable()
export class LowStockWarningSubscriber implements ISubscriber {
  @OnEvent('machine.low_stock_warning')
  handle(event: LowStockWarningEvent): void {
    console.log(event);
  }
}
