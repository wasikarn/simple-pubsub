import { Logger } from '@nestjs/common';

import { MachineStatus } from '../../../commons/enums';
import { IEvent } from '../interfaces/event.interface';

export class MachineSaleEvent implements IEvent {
  private readonly logger: Logger = new Logger(MachineSaleEvent.name);

  constructor(
    private readonly _sold: number,
    private readonly _machineId: string,
  ) {
    this.logger.log(
      `${MachineSaleEvent.name} emitted. machineId: ${_machineId}, sold: ${_sold}`,
    );
  }

  machineId(): string {
    return this._machineId;
  }

  type(): string {
    return MachineStatus.SALE;
  }

  getSoldQuantity(): number {
    return this._sold;
  }
}
