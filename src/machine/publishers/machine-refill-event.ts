import { MachineStatus } from '../../commons/enums';
import { IEvent } from '../../interfaces/event.interface';

export class MachineRefillEvent implements IEvent {
  constructor(
    private readonly _machineId: string,
    private readonly _refill: number,
  ) {
    console.log(`${MachineRefillEvent.name} emitted`);
  }

  machineId(): string {
    return this._machineId;
  }

  type(): string {
    return MachineStatus.REFILL;
  }

  getRefillQuantity(): number {
    return this._refill;
  }
}
