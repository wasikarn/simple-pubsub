import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Machine, MachineDocument, MachineModel } from './machine';

@Injectable()
export class MachineService {
  constructor(@InjectModel(Machine.name) private machineModel: MachineModel) {}

  async create(machine: Machine): Promise<MachineDocument> {
    const createdMachine = new this.machineModel(machine);

    return createdMachine.save();
  }

  async findOrCreate(machine: Machine): Promise<MachineDocument> {
    const existingMachine: MachineDocument | null =
      await this.machineModel.findOne({
        _id: machine.id,
      });

    if (existingMachine) return existingMachine;

    return this.create(machine);
  }
}
