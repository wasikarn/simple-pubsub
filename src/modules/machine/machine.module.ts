import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { machines } from '../../commons/constants';
import { Machine, MachineSchema } from './machine';
import { LowStockWarningSubscriber } from './subscribers/low-stock-warning-subscriber';
import { MachineRefillSubscriber } from './subscribers/machine-refill-subscriber';
import { MachineSaleSubscriber } from './subscribers/machine-sale-subscriber';
import { StockLevelOkSubscriber } from './subscribers/stock-level-ok-subscriber';

@Module({
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
export class MachineModule {}
