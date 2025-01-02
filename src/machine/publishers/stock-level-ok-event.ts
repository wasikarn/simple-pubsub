import { EventType } from '../../commons/enums';
import { IEvent } from '../../interfaces/event.interface';

export class StockLevelOkEvent implements IEvent {
  constructor(private readonly _machineId: string) {
    console.log(`${StockLevelOkEvent.name} emitted`);
  }

  machineId(): string {
    return this._machineId;
  }

  type(): string {
    return EventType.STOCK_LEVEL_OK;
  }
}
