import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LowStockWarningSubscriber } from './subscribers/low-stock-warning-subscriber';
import { MachineRefillSubscriber } from './subscribers/machine-refill-subscriber';
import { MachineSaleSubscriber } from './subscribers/machine-sale-subscriber';
import { StockLevelOkSubscriber } from './subscribers/stock-level-ok-subscriber';

@Module({
  controllers: [AppController],
  imports: [EventEmitterModule.forRoot()],
  providers: [
    AppService,
    MachineSaleSubscriber,
    MachineRefillSubscriber,
    LowStockWarningSubscriber,
    StockLevelOkSubscriber,
  ],
})
export class AppModule {}
