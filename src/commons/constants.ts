import { Machine } from '../modules/machine/entities/machine.entity';

export const machines: Machine[] = [
  new Machine('001'),
  new Machine('002'),
  new Machine('003'),
];

export const Events = {
  LOW_STOCK_WARNING: 'machine.low_stock_warning',
  REFILL: 'machine.refill',
  SALE: 'machine.sale',
  STOCK_LEVEL_OK: 'machine.stock_level_ok',
};
