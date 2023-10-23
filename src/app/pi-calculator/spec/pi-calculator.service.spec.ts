import { Test, TestingModule } from '@nestjs/testing';
import { PiCalculatorService } from '../pi-calculator.service';

describe('PiCalculatorService', () => {
  let service: PiCalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PiCalculatorService],
    }).compile();

    service = module.get<PiCalculatorService>(PiCalculatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
