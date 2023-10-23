import { Test, TestingModule } from '@nestjs/testing';
import { PiCalculatorController } from '../pi-calculator.controller';

describe('PiCalculatorController', () => {
  let controller: PiCalculatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PiCalculatorController],
    }).compile();

    controller = module.get<PiCalculatorController>(PiCalculatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
