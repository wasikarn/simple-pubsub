import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

export type MachineDocument = HydratedDocument<Machine>;
export type MachineModel = Model<MachineDocument>;

@Schema({ _id: false, collection: 'machines' })
export class Machine {
  @Prop()
  public id: string;

  @Prop({ default: 10 })
  public stockLevel: number;

  @Prop({ default: 3 })
  public threshold: number;

  reduceStock(quantity: number): void {
    this.stockLevel -= quantity;
  }

  refillStock(quantity: number): void {
    this.stockLevel += quantity;
  }
}

export const MachineSchema = SchemaFactory.createForClass(Machine);
