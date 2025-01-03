import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { machines } from './commons/constants';
import { LowStockWarningSubscriber } from './subscribers/low-stock-warning-subscriber';
import { MachineRefillSubscriber } from './subscribers/machine-refill-subscriber';
import { MachineSaleSubscriber } from './subscribers/machine-sale-subscriber';
import { StockLevelOkSubscriber } from './subscribers/stock-level-ok-subscriber';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<MongooseModuleFactoryOptions> => {
        const username: string = configService.getOrThrow('MONGO_USERNAME');
        const password: string = configService.getOrThrow('MONGO_PASSWORD');
        const database: string = configService.getOrThrow('MONGO_DATABASE');
        const host: string = configService.getOrThrow('MONGO_HOST');

        return {
          dbName: database,
          uri: `mongodb://${username}:${password}@${host}`,
        };
      },
    }),
  ],
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
