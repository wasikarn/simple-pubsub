import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { AppController } from './app.controller';
import { MachineModule } from './modules/machine/machine.module';

@Module({
  controllers: [AppController],
  imports: [EventEmitterModule.forRoot(), MachineModule],
})
export class AppModule {}
