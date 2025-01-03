import { Module } from '@nestjs/common';

import { PublishSubscribeService } from './services/publish-subscribe.service';
import { LowStockWarningSubscriber } from './subscribers/low-stock-warning-subscriber';
import { MachineRefillSubscriber } from './subscribers/machine-refill-subscriber';
import { MachineSaleSubscriber } from './subscribers/machine-sale-subscriber';
import { StockLevelOkSubscriber } from './subscribers/stock-level-ok-subscriber';

@Module({
  exports: [PublishSubscribeService],
  providers: [
    PublishSubscribeService,
    MachineSaleSubscriber,
    MachineRefillSubscriber,
    LowStockWarningSubscriber,
    StockLevelOkSubscriber,
  ],
})
export class MachineModule {}
