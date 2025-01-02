export class Machine {
  constructor(
    private readonly id: string,
    private stockLevel = 10,
  ) {}

  getId() {
    return this.id;
  }

  getStockLevel() {
    return this.stockLevel;
  }

  sell(quantity: number): void {
    if (this.stockLevel >= quantity) {
      this.stockLevel -= quantity;
      console.log(
        `Machine ${this.id} sold ${quantity}. Remaining stock: ${this.stockLevel}.`,
      );

      return;
    }

    console.log(`Machine ${this.id} has insufficient stock.`);
  }
}
