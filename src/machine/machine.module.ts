import { Module } from '@nestjs/common';
import { MachineService } from './machine.service';
import { MachineSaleEvent } from './events/machine-sale-event';
import { MachineRefillEvent } from './events/machine-refill-event';
import { LowStockWarningEvent } from './events/low-stock-warning-event';
import { StockLevelOkEvent } from './events/stock-level-ok-event';

@Module({
  providers: [MachineService, MachineSaleEvent, MachineRefillEvent, LowStockWarningEvent, StockLevelOkEvent],
})
export class MachineModule {}
