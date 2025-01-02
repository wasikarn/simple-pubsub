import { Module } from '@nestjs/common';

import { MachineService } from './machine.service';
import { LowStockWarningEvent } from './publishers/low-stock-warning-event';
import { MachineRefillEvent } from './publishers/machine-refill-event';
import { MachineSaleEvent } from './publishers/machine-sale-event';
import { StockLevelOkEvent } from './publishers/stock-level-ok-event';
import { LowStockWarningSubscriber } from './subscribers/low-stock-warning-subscriber';
import { MachineRefillSubscriber } from './subscribers/machine-refill-subscriber';
import { MachineSaleSubscriber } from './subscribers/machine-sale-subscriber';
import { StockLevelOkSubscriber } from './subscribers/stock-level-ok-subscriber';

@Module({
  providers: [
    MachineService,
    MachineSaleEvent,
    MachineSaleSubscriber,
    MachineRefillEvent,
    MachineRefillSubscriber,
    LowStockWarningEvent,
    LowStockWarningSubscriber,
    StockLevelOkEvent,
    StockLevelOkSubscriber,
  ],
})
export class MachineModule {}
