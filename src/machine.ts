export class Machine {
  public id: string;
  public stockLevel = 10;

  constructor(id: string) {
    this.id = id;
  }

  getId(): string {
    return this.id;
  }

  getStockLevel(): number {
    return this.stockLevel;
  }

  reduceStock(quantity: number): void {
    if (this.stockLevel < quantity) {
      return;
    }

    this.stockLevel -= quantity;
  }

  refillStock(quantity: number): void {
    this.stockLevel += quantity;
  }
}
