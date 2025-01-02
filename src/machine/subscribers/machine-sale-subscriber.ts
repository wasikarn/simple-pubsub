import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { ISubscriber } from '../../interfaces/subscriber.interface';
import { MachineSaleEvent } from '../publishers/machine-sale-event';

@Injectable()
export class MachineSaleSubscriber implements ISubscriber {
  @OnEvent('machine.sale')
  handle(event: MachineSaleEvent): void {
    console.log(event);
  }
}
