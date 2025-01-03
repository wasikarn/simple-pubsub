import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { randomMachine } from './commons/helpers';
import { MachineRefillEvent } from './modules/machine/events/machine-refill-event';
import { MachineSaleEvent } from './modules/machine/events/machine-sale-event';
import { PublishSubscribeService } from './modules/machine/services/publish-subscribe.service';

jest.mock('./commons/helpers');

describe('AppController', () => {
  let appController: AppController;
  let pubSubService: PublishSubscribeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: PublishSubscribeService,
          useValue: { publish: jest.fn() },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    pubSubService = module.get<PublishSubscribeService>(
      PublishSubscribeService,
    );
  });

  describe('sale', () => {
    it('should publish a MachineSaleEvent with a provided machineId', () => {
      const machineId: string = randomMachine();
      const saleQty = 1;

      jest.spyOn(global.Math, 'random').mockReturnValue(0.4); // Ensure saleQty is 1

      appController.sale(machineId);

      expect(pubSubService.publish).toHaveBeenCalledWith(
        new MachineSaleEvent(saleQty, machineId),
      );
    });

    it('should publish a MachineSaleEvent with a random machineId when none is provided', () => {
      const randomMachineId: string = randomMachine();
      const saleQty = 2;

      (randomMachine as jest.Mock).mockReturnValue(randomMachineId);
      jest.spyOn(global.Math, 'random').mockReturnValue(0.6); // Ensure saleQty is 2

      appController.sale('');

      expect(randomMachine).toHaveBeenCalled();
      expect(pubSubService.publish).toHaveBeenCalledWith(
        new MachineSaleEvent(saleQty, randomMachineId),
      );
    });
  });

  describe('refill', () => {
    it('should publish a MachineRefillEvent with a provided machineId', () => {
      const machineId: string = randomMachine();
      const refillQty = 3;

      jest.spyOn(global.Math, 'random').mockReturnValue(0.4); // Ensure refill is 3

      appController.refill(machineId);

      expect(pubSubService.publish).toHaveBeenCalledWith(
        new MachineRefillEvent(refillQty, machineId),
      );
    });

    it('should publish a MachineRefillEvent with a random machineId when none is provided', () => {
      const randomMachineId: string = randomMachine();
      const refillQty = 5;

      (randomMachine as jest.Mock).mockReturnValue(randomMachineId);
      jest.spyOn(global.Math, 'random').mockReturnValue(0.6); // Ensure refill is 5

      appController.refill('');

      expect(randomMachine).toHaveBeenCalled();
      expect(pubSubService.publish).toHaveBeenCalledWith(
        new MachineRefillEvent(refillQty, randomMachineId),
      );
    });
  });
});
