import { Controller, Get } from '@nestjs/common';

import { eventGenerator } from './commons/helpers';
import { IEvent } from './modules/machine/interfaces/event.interface';
import { Machine } from './modules/machine/machine';
import { MachineService } from './modules/machine/machine.service';
import { PublishSubscribeService } from './modules/machine/publish-subscribe.service';

@Controller()
export class AppController {
  constructor(
    private readonly pubSubService: PublishSubscribeService,
    private readonly machineService: MachineService,
  ) {}

  @Get()
  run(): void {
    const machines: Machine[] = [
      new Machine('001'),
      new Machine('002'),
      new Machine('003'),
    ];

    machines.forEach(async (machine: Machine): Promise<void> => {
      await this.machineService.findOrCreate(machine);
    });

    const events: IEvent[] = Array(5)
      .fill(undefined)
      .map((): IEvent => eventGenerator());

    events.map((event: IEvent): void => this.pubSubService.publish(event));
  }
}
