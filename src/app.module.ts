import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { machines } from './commons/constants';
import { LowStockWarningSubscriber } from './subscribers/low-stock-warning-subscriber';
import { MachineRefillSubscriber } from './subscribers/machine-refill-subscriber';
import { MachineSaleSubscriber } from './subscribers/machine-sale-subscriber';
import { StockLevelOkSubscriber } from './subscribers/stock-level-ok-subscriber';

@Module({
  controllers: [AppController],
  imports: [EventEmitterModule.forRoot()],
  providers: [
    AppService,
    {
      provide: MachineSaleSubscriber,
      useValue: new MachineSaleSubscriber(machines),
    },
    {
      provide: MachineRefillSubscriber,
      useValue: new MachineRefillSubscriber(machines),
    },
    {
      provide: LowStockWarningSubscriber,
      useValue: new LowStockWarningSubscriber(machines),
    },
    {
      provide: StockLevelOkSubscriber,
      useValue: new StockLevelOkSubscriber(machines),
    },
  ],
})
export class AppModule {}
