import { MachineStatus } from '../../../commons/enums';
import { IEvent } from '../interfaces/event.interface';

export class MachineSaleEvent implements IEvent {
  constructor(
    private readonly _sold: number,
    private readonly _machineId: string,
  ) {
    console.log(`${MachineSaleEvent.name} emitted`);
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
