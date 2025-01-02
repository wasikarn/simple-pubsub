import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MachineModule } from './machine/machine.module';

@Module({
  controllers: [AppController],
  imports: [EventEmitterModule.forRoot(), MachineModule],
  providers: [AppService],
})
export class AppModule {}
