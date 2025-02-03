import { Logger } from '@nestjs/common';

import { Events } from '../../../commons/constants';
import { IEvent } from '../interfaces/event.interface';

export class MachineRefillEvent implements IEvent {
  private readonly logger: Logger = new Logger(MachineRefillEvent.name);

  constructor(
    private readonly refill: number,
    private readonly _machineId: string,
  ) {
    this.logger.log(
      `${MachineRefillEvent.name} emitted. machineId: ${_machineId}, refill: ${refill}`,
    );
  }

  machineId(): string {
    return this._machineId;
  }

  type(): string {
    return Events.REFILL;
  }

  getRefillQuantity(): number {
    return this.refill;
  }
}
