import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { MachineEventType } from '../commons/enums';
import { LowStockWarningEvent } from './publishers/low-stock-warning-event';
import { MachineRefillEvent } from './publishers/machine-refill-event';
import { MachineSaleEvent } from './publishers/machine-sale-event';
import { StockLevelOkEvent } from './publishers/stock-level-ok-event';

@Injectable()
export class MachineService {
  constructor(private eventEmitter: EventEmitter2) {}

  sale(machineId: string, quantity: number) {
    this.eventEmitter.emit(
      MachineEventType.SALE,
      new MachineSaleEvent(machineId, quantity),
    );
  }

  refill(machineId: string, quantity: number) {
    this.eventEmitter.emit(
      MachineEventType.REFILL,
      new MachineRefillEvent(machineId, quantity),
    );
  }

  lowestStockWarning(machineId: string, quantity: number) {
    this.eventEmitter.emit(
      MachineEventType.LOW_STOCK_WARNING,
      new LowStockWarningEvent(machineId, quantity),
    );
  }

  stockLevelOk(machineId: string, quantity: number) {
    this.eventEmitter.emit(
      MachineEventType.STOCK_LEVEL_OK,
      new StockLevelOkEvent(machineId, quantity),
    );
  }
}
