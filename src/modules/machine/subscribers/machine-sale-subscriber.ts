import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { machines } from '../../../commons/constants';
import { Events } from '../../../commons/enums';
import { Machine } from '../entities/machine.entity';
import { LowStockWarningEvent } from '../events/low-stock-warning-event';
import { MachineSaleEvent } from '../events/machine-sale-event';
import { ISubscriber } from '../interfaces/subscriber.interface';
import { PublishSubscribeService } from '../services/publish-subscribe.service';

@Injectable()
export class MachineSaleSubscriber implements ISubscriber {
  private readonly logger: Logger = new Logger(MachineSaleSubscriber.name);

  constructor(private readonly pubSubService: PublishSubscribeService) {}

  @OnEvent(Events.SALE)
  handle(event: MachineSaleEvent): void {
    const machine: Machine = this.findMachineById(event.machineId());

    if (machine.isOutOfStock()) {
      this.logger.error(`Machine out of stock. machineId: ${machine.id}`);

      return;
    }

    machine.decrementStock(event.getSoldQuantity());

    this.handleLowStockWarning(machine);

    this.logger.log(
      `Machine sale event handled. machineId: ${machine.id}, stock: ${machine.stockLevel} units`,
    );
  }

  /**
   * Finds a machine by its unique identifier.
   *
   * @param {string} machineId - The unique identifier of the machine to find.
   * @return {Machine} The machine object that matches the provided identifier.
   * @throws {NotFoundException} If no machine is found with the given identifier.
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
   * Handles the low stock warning for a given machine by determining if a
   * warning should be published and publishing it if necessary.
   *
   * @param {Machine} machine - The machine instance is to check for low stock and potentially publish a warning for.
   * @return {void} Does not return a value.
   */
  private handleLowStockWarning(machine: Machine): void {
    if (!this.shouldPublishLowStockWarning(machine)) return;

    this.publishLowStockWarning(machine);
  }

  /**
   * Determines whether a low stock warning should be published for the given machine.
   *
   * @param {Machine} machine - The machine to check the stock status of.
   * @return {boolean} Returns true if the machine is out of stock and has not yet issued a low stock warning; otherwise, false.
   */
  private shouldPublishLowStockWarning(machine: Machine): boolean {
    return machine.isOutOfStock() && !machine.isLowStockWaring;
  }

  /**
   * Publishes a low stock warning for the specified machine.
   *
   * @param {Machine} machine - The machine for which the low stock warning is to be published.
   * @return {void} This method does not return a value.
   */
  private publishLowStockWarning(machine: Machine): void {
    machine.isLowStockWaring = true;

    this.pubSubService.publish(
      new LowStockWarningEvent(machine.id, machine.stockLevel),
    );
  }
}
