import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MachineDocument = HydratedDocument<Machine>;

@Schema({ _id: false, collection: 'machines' })
export class Machine {
  @Prop()
  public id: string;

  @Prop({ default: 10 })
  public stockLevel: number;

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

export const MachineSchema = SchemaFactory.createForClass(Machine);
