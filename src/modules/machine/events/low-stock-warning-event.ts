import { MachineStatus } from '../../../commons/enums';
import { IEvent } from '../interfaces/event.interface';

export class LowStockWarningEvent implements IEvent {
  constructor(
    private readonly _machineId: string,
    private readonly _stock: number,
  ) {
    console.log(`${LowStockWarningEvent.name} emitted`);
  }

  machineId(): string {
    return this._machineId;
  }

  type(): string {
    return MachineStatus.STOCK_WARNING;
  }

  getStockQuantity(): number {
    return this._stock;
  }
}
