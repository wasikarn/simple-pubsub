import { MachineRefillEvent } from '../modules/machine/events/machine-refill-event';
import { MachineSaleEvent } from '../modules/machine/events/machine-sale-event';
import { IEvent } from '../modules/machine/interfaces/event.interface';

/**
 * A function that generates a random string representing a machine code.
 *
 * The function produces one of three possible three-character strings
 * ('001', '002', or '003') based on a random number.
 * The random number is generated within the range [0, 3), and the result is determined by
 * dividing the range into three equal segments:
 * - If the random number is less than 1, the function returns '001'.
 * - If the random number is between 1 (inclusive) and 2 (exclusive), it returns '002'.
 * - If the random number is greater than or equal to 2, it returns '003'.
 *
 * @returns {string} A random machine code as a string ('001', '002', or '003').
 */
export const randomMachine: () => string = (): string => {
  const random: number = Math.random() * 3;

  if (random < 1) {
    return '001';
  } else if (random < 2) {
    return '002';
  }

  return '003';
};

/**
 * Generates a random machine event, either a sale event or a refill event.
 *
 * The method decides the type of event to generate based on a random number.
 * If the number is below 0.5, it creates a sale event with a random sale quantity
 * (either 1 or 2).
 * Otherwise, it creates a refill event with a random refill quantity (either 3 or 5).
 * Both events are associated with a random machine.
 *
 * @return {IEvent} Returns an instance of either MachineSaleEvent or MachineRefillEvent.
 */
export function eventGenerator(): IEvent {
  const random: number = Math.random();

  if (random < 0.5) {
    const saleQty: number = Math.random() < 0.5 ? 1 : 2;

    return new MachineSaleEvent(saleQty, randomMachine());
  }

  const refillQty: number = Math.random() < 0.5 ? 3 : 5;

  return new MachineRefillEvent(refillQty, randomMachine());
}
