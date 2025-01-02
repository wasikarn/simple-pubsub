import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { MachineEventType } from './commons/enums';
import { MachineRefillEvent } from './publishers/machine-refill-event';
import { MachineSaleEvent } from './publishers/machine-sale-event';

@Injectable()
export class AppService {
  constructor(private eventEmitter: EventEmitter2) {}

  sale(sold: number, machineId: string): void {
    this.eventEmitter.emit(
      MachineEventType.SALE,
      new MachineSaleEvent(sold, machineId),
    );
  }

  refill(refill: number, machineId: string): void {
    this.eventEmitter.emit(
      MachineEventType.REFILL,
      new MachineRefillEvent(refill, machineId),
    );
  }
}
