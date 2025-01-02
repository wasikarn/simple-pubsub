import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { MachineStatus } from '../commons/enums';
import { ISubscriber } from '../interfaces/subscriber.interface';
import { StockLevelOkEvent } from '../publishers/stock-level-ok-event';

@Injectable()
export class StockLevelOkSubscriber implements ISubscriber {
  @OnEvent(MachineStatus.STOCK_LEVEL_OK)
  handle(event: StockLevelOkEvent): void {
    console.log(event);
  }
}
