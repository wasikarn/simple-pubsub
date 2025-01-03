import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { MachineModule } from './modules/machine/machine.module';

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
    MachineModule,
  ],
})
export class AppModule {}
