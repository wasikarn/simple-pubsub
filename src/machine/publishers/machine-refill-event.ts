import { EventType } from '../../commons/enums';
import { IEvent } from '../../interfaces/event.interface';

export class MachineRefillEvent implements IEvent {
  constructor(
    private readonly _refill: number,
    private readonly _machineId: string,
  ) {
    console.log(`${MachineRefillEvent.name} emitted`);
  }

  machineId(): string {
    return this._machineId;
  }

  type(): string {
    return EventType.REFILL;
  }
}
