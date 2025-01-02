import { AppService } from '../app.service';

export const randomMachine: () => string = (): string => {
  const random: number = Math.random() * 3;

  if (random < 1) {
    return '001';
  } else if (random < 2) {
    return '002';
  }

  return '003';
};

export function eventGenerator(appService: AppService): void {
  const random: number = Math.random();

  if (random < 0.5) {
    const saleQty: number = Math.random() < 0.5 ? 1 : 2;

    appService.sale(saleQty, randomMachine());

    return;
  }

  const refillQty: number = Math.random() < 0.5 ? 3 : 5;

  appService.refill(refillQty, randomMachine());
}
