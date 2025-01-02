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
    if (this.stockLevel >= quantity) {
      this.stockLevel -= quantity;
      console.log(
        `Machine ${this.id} sold ${quantity}. Remaining stock: ${this.stockLevel}.`,
      );

      return;
    }

    console.log(`Machine ${this.id} has insufficient stock.`);
  }

  refillStock(quantity: number): void {
    this.stockLevel += quantity;
    console.log(
      `Machine ${this.id} refilled ${quantity}. Remaining stock: ${this.stockLevel}.`,
    );
  }
}
