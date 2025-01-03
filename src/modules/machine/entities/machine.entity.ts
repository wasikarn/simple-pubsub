export class Machine {
  public id: string;
  public stockLevel = 10;
  public threshold = 3;
  public isLowStockWaring = false;

  constructor(id: string) {
    this.id = id;
  }

  isLowerStock(): boolean {
    return this.stockLevel < this.threshold;
  }

  isStockSufficient(): boolean {
    return this.stockLevel >= this.threshold;
  }

  decrementStock(quantity: number): void {
    this.stockLevel -= quantity;
  }

  incrementStock(quantity: number): void {
    this.stockLevel += quantity;
  }

  isOutOfStock(): boolean {
    return this.stockLevel <= 0;
  }
}
