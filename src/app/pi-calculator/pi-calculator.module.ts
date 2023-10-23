import { Module } from '@nestjs/common';
import { PiCalculatorController } from './pi-calculator.controller';
import { PiCalculatorService } from './pi-calculator.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PiCalculator, PiCalculatorSchema } from './pi-calculator.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PiCalculator.name,
        schema: PiCalculatorSchema,
      },
    ]),
  ],
  exports: [PiCalculatorModule],
  controllers: [PiCalculatorController],
  providers: [PiCalculatorService],
})
export class PiCalculatorModule {}
