import { Logger } from '@nestjs/common';

import { Events } from '../../../commons/constants';
import { IEvent } from '../interfaces/event.interface';

export class MachineSaleEvent implements IEvent {
  private readonly logger: Logger = new Logger(MachineSaleEvent.name);

  constructor(
    private readonly sold: number,
    private readonly _machineId: string,
  ) {
    this.logger.log(
      `${MachineSaleEvent.name} emitted. machineId: ${_machineId}, sold: ${sold}`,
    );
  }

  machineId(): string {
    return this._machineId;
  }

  type(): string {
    return Events.SALE;
  }

  getSoldQuantity(): number {
    return this.sold;
  }
}
