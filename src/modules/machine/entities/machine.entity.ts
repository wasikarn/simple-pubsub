export class Machine {
  public stockLevel: number;
  public threshold: number;
  public lowStockWarningEmitted: boolean;
  public stockLevelOkEmitted: boolean;

  constructor(
    public readonly id: string,
    initialStock = 10,
    threshold = 3,
  ) {
    this.stockLevel = initialStock;
    this.threshold = threshold;
    this.lowStockWarningEmitted = false;
    this.stockLevelOkEmitted = false;
  }
}
