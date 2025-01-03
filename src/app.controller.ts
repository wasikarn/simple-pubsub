import { Controller, Get } from '@nestjs/common';

import { machines } from './commons/constants';
import { InventoryState } from './commons/enums';
import { eventGenerator } from './commons/helpers';
import { IEvent } from './modules/machine/interfaces/event.interface';
import { PublishSubscribeService } from './modules/machine/services/publish-subscribe.service';
import { LowStockWarningSubscriber } from './modules/machine/subscribers/low-stock-warning-subscriber';
import { MachineRefillSubscriber } from './modules/machine/subscribers/machine-refill-subscriber';
import { MachineSaleSubscriber } from './modules/machine/subscribers/machine-sale-subscriber';
import { StockLevelOkSubscriber } from './modules/machine/subscribers/stock-level-ok-subscriber';

@Controller()
export class AppController {
  constructor(private readonly pubSubService: PublishSubscribeService) {}

  @Get()
  run(): void {
    const pubSubService = new PublishSubscribeService();
    const saleSubscriber = new MachineSaleSubscriber(machines);
    const refillSubscriber = new MachineRefillSubscriber(machines);
    const lowStockWarningSubscriber = new LowStockWarningSubscriber();
    const stockLevelOkSubscriber = new StockLevelOkSubscriber();

    pubSubService.subscribe(InventoryState.SALE, saleSubscriber);
    pubSubService.subscribe(InventoryState.REFILL, refillSubscriber);
    pubSubService.subscribe(
      InventoryState.STOCK_WARNING,
      lowStockWarningSubscriber,
    );
    pubSubService.subscribe(InventoryState.STOCK_OK, stockLevelOkSubscriber);

    const events: IEvent[] = Array(5)
      .fill(undefined)
      .map((): IEvent => eventGenerator());

    events.map((event: IEvent): void => this.pubSubService.publish(event));
  }
}
