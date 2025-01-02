import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { MachineEventType } from '../../commons/enums';
import { ISubscriber } from '../../interfaces/subscriber.interface';
import { MachineSaleEvent } from '../publishers/machine-sale-event';

@Injectable()
export class MachineSaleSubscriber implements ISubscriber {
  @OnEvent(MachineEventType.SALE)
  handle(event: MachineSaleEvent): void {
    console.log(event);
  }
}
