import { EventType } from '../../commons/enums';
import { IEvent } from '../../interfaces/event.interface';

export class LowStockWarningEvent implements IEvent {
  constructor(private readonly _machineId: string) {
    console.log(`${LowStockWarningEvent.name} emitted`);
  }

  machineId(): string {
    return this._machineId;
  }

  type(): string {
    return EventType.LOW_STOCK_WARNING;
  }
}
