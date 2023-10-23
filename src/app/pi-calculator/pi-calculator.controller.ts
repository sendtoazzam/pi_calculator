import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { PiCalculatorService } from './pi-calculator.service';
import { AuthUser } from 'src/common/type/auth-user.type';
import { User } from 'src/common/decorator/user.decorator';

@Controller('calculator')
@ApiBearerAuth('x-auth-user-data')
export class PiCalculatorController {
  constructor(private readonly calculatorService: PiCalculatorService) {}
  @Get('pi-calculator')
  @ApiResponse({
    status: 200,
    type: Object,
    description: '{ piValue: 1234 }',
  })
  @ApiResponse({ status: 103, description: 'Token Missing Exception' })
  async calculate(): Promise<object> {
    const calculatePi = await this.calculatorService.getPi();
    return {
      piValue: calculatePi,
    };
  }

  @Get('calculate-pi')
  @ApiResponse({
    status: 200,
    type: Object,
    description: '{ piValue: 1234 }',
  })
  @ApiResponse({ status: 103, description: 'Token Missing Exception' })
  async generateNew(@User() user: AuthUser): Promise<object> {
    const calculatePi = await this.calculatorService.calculate(user);
    return {
      piValue: calculatePi,
    };
  }

  @Get('sun-circumference')
  @ApiResponse({
    status: 200,
    type: Object,
    description: '{ value: 1234 }',
  })
  @ApiResponse({ status: 103, description: 'Token Missing Exception' })
  async getSunCircumference(): Promise<object> {
    const sun = await this.calculatorService.getSunCircumference();
    return {
      value: Number(sun),
    };
  }
}
