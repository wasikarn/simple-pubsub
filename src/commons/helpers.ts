import { IEvent } from '../interfaces/event.interface';
import { MachineRefillEvent } from '../publishers/machine-refill-event';
import { MachineSaleEvent } from '../publishers/machine-sale-event';

export const randomMachine: () => string = (): string => {
  const random: number = Math.random() * 3;

  if (random < 1) {
    return '001';
  } else if (random < 2) {
    return '002';
  }

  return '003';
};

export function eventGenerator(): IEvent {
  const random: number = Math.random();

  if (random < 0.5) {
    const saleQty: number = Math.random() < 0.5 ? 1 : 2;

    return new MachineSaleEvent(saleQty, randomMachine());
  }

  const refillQty: number = Math.random() < 0.5 ? 3 : 5;

  return new MachineRefillEvent(refillQty, randomMachine());
}
