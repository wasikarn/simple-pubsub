import { MachineStatus } from '../commons/enums';
import { IEvent } from '../interfaces/event.interface';

export class StockLevelOkEvent implements IEvent {
  constructor(
    private readonly _stock: number,
    private readonly _machineId: string,
  ) {
    console.log(`${StockLevelOkEvent.name} emitted`);
  }

  machineId(): string {
    return this._machineId;
  }

  type(): string {
    return MachineStatus.STOCK_LEVEL_OK;
  }

  getStockQuantity(): number {
    return this._stock;
  }
}
