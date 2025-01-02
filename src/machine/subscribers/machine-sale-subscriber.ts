import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { ISubscriber } from '../../interfaces/subscriber.interface';
import { Machine } from '../machine';
import { MachineSaleEvent } from '../publishers/machine-sale-event';

@Injectable()
export class MachineSaleSubscriber implements ISubscriber {
  public machines: Machine[];

  constructor(machines: Machine[]) {
    this.machines = machines;
  }

  @OnEvent('machine.sale')
  handle(event: MachineSaleEvent): void {
    console.log(event);
  }
}
