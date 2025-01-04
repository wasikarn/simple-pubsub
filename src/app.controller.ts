import { Controller, Get, Query } from '@nestjs/common';

import { eventGenerator, randomMachine } from './commons/helpers';
import { MachineRefillEvent } from './modules/machine/events/machine-refill-event';
import { MachineSaleEvent } from './modules/machine/events/machine-sale-event';
import { IEvent } from './modules/machine/interfaces/event.interface';
import { PublishSubscribeService } from './modules/machine/services/publish-subscribe.service';

@Controller()
export class AppController {
  constructor(private readonly pubSubService: PublishSubscribeService) {}

  @Get('sale')
  sale(@Query('machineId') machineId: string): void {
    if (!machineId) machineId = randomMachine();

    const saleQty: number = Math.random() < 0.5 ? 1 : 2;
    const machineSaleEvent = new MachineSaleEvent(saleQty, machineId);

    this.pubSubService.publish(machineSaleEvent);
  }

  @Get('refill')
  refill(@Query('machineId') machineId: string): void {
    if (!machineId) machineId = randomMachine();

    const refillQty: number = Math.random() < 0.5 ? 3 : 5;
    const machineRefillEvent = new MachineRefillEvent(refillQty, machineId);

    this.pubSubService.publish(machineRefillEvent);
  }

  @Get('random')
  random(): void {
    const events: IEvent[] = Array(5)
      .fill(undefined)
      .map((): IEvent => eventGenerator());

    events.forEach((event: IEvent): void => this.pubSubService.publish(event));
  }
}
