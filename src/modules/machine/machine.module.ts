import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { Machine, MachineSchema } from './machine';
import { MachineService } from './machine.service';
import { PublishSubscribeService } from './publish-subscribe.service';
import { LowStockWarningSubscriber } from './subscribers/low-stock-warning-subscriber';
import { MachineRefillSubscriber } from './subscribers/machine-refill-subscriber';
import { MachineSaleSubscriber } from './subscribers/machine-sale-subscriber';
import { StockLevelOkSubscriber } from './subscribers/stock-level-ok-subscriber';

@Module({
  exports: [MachineService, PublishSubscribeService],
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: Machine.name,
        schema: MachineSchema,
      },
    ]),
  ],
  providers: [
    MachineService,
    PublishSubscribeService,
    MachineSaleSubscriber,
    MachineRefillSubscriber,
    LowStockWarningSubscriber,
    StockLevelOkSubscriber,
  ],
})
export class MachineModule {}
