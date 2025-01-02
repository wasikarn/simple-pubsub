import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { ISubscriber } from '../../interfaces/subscriber.interface';
import { StockLevelOkEvent } from '../publishers/stock-level-ok-event';

@Injectable()
export class StockLevelOkSubscriber implements ISubscriber {
  @OnEvent('machine.stock_level_ok')
  handle(event: StockLevelOkEvent): void {
    console.log(event);
  }
}
