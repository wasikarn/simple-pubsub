import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

export type MachineDocument = HydratedDocument<Machine>;
export type MachineModel = Model<MachineDocument>;

@Schema({ collection: 'machines', versionKey: false })
export class Machine {
  @Prop({ required: true })
  public _id: string;

  @Prop({ default: 10 })
  public stockLevel: number;

  @Prop({ default: 3 })
  public threshold: number;

  constructor(id: string) {
    this._id = id;
  }

  get id(): string {
    return this._id.toString();
  }

  reduceStock(quantity: number): void {
    this.stockLevel -= quantity;
  }

  refillStock(quantity: number): void {
    this.stockLevel += quantity;
  }
}

export const MachineSchema = SchemaFactory.createForClass(Machine);
