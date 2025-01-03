import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { MachineModule } from './modules/machine/machine.module';

@Module({
  controllers: [AppController],
  imports: [MachineModule],
})
export class AppModule {}
