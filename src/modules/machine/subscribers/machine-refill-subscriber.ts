import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { machines } from '../../../commons/constants';
import { Events } from '../../../commons/enums';
import { Machine } from '../entities/machine.entity';
import { MachineRefillEvent } from '../events/machine-refill-event';
import { StockLevelOkEvent } from '../events/stock-level-ok-event';
import { ISubscriber } from '../interfaces/subscriber.interface';
import { PublishSubscribeService } from '../services/publish-subscribe.service';

@Injectable()
export class MachineRefillSubscriber implements ISubscriber {
  private readonly logger: Logger = new Logger(MachineRefillSubscriber.name);

  constructor(private readonly pubSubService: PublishSubscribeService) {}

  @OnEvent(Events.REFILL)
  handle(event: MachineRefillEvent): void {
    const machine: Machine = this.findMachineById(event.machineId());

    machine.incrementStock(event.getRefillQuantity());

    this.handleStockStatus(machine);

    this.logger.log(
      `Machine refill event handled. machineId: ${machine.id}, stock: ${machine.stockLevel} units`,
    );
  }

  /**
   * Finds and returns a machine by its unique identifier.
   *
   * @param {string} machineId - The unique identifier of the machine to find.
   * @return {Machine} The machine object with the matching identifier.
   * @throws {NotFoundException} If the machine with the given identifier is not found.
   */
  private findMachineById(machineId: string): Machine {
    const machine: Machine | undefined = machines.find(
      (machine: Machine): boolean => machine.id === machineId,
    );

    if (!machine) {
      throw new NotFoundException('Machine not found');
    }

    return machine;
  }

  /**
   * Manages the stock status of the provided machine by evaluating its stock levels
   * and emitting relevant events based on its current state.
   *
   * @param {Machine} machine - The machine whose stock status needs to be checked and handled.
   * @return {void} This method does not return a value.
   */
  private handleStockStatus(machine: Machine): void {
    if (!machine.isStockSufficient()) return;

    machine.isLowStockWaring = false;

    this.pubSubService.publish(
      new StockLevelOkEvent(machine.id, machine.stockLevel),
    );
  }
}
