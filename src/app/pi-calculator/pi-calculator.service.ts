import { Injectable } from '@nestjs/common';
import { AuthUser } from 'src/common/type/auth-user.type';
import { PiCalculator } from './pi-calculator.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PiCalculatorService {
  constructor(
    @InjectModel(PiCalculator.name)
    private readonly piModel: Model<PiCalculator>,
  ) {}

  async calculate(user: AuthUser): Promise<number> {
    const getData = await this.calculateValueOfPi(1000000);

    if (getData) {
      await this.piModel.create({
        piValue: getData,
        createdBy: user,
      });
    }
    return getData;
  }

  async getPi(): Promise<number> {
    const getData = await this.piModel.findOne().sort({ createdAt: -1 });
    return parseFloat(getData.piValue);
  }

  async getSunCircumference(): Promise<number> {
    return 12;
  }

  private calculateValueOfPi(iterations) {
    let total = 0;
    let pointCircle = 0;
    for (let i = 0; i < iterations; i++) {
      const x = Math.random();
      const y = Math.random();
      if (x * x + y * y <= 1) {
        pointCircle++;
      }
      total++;
    }
    const pi = 4 * (pointCircle / total);
    return pi;
  }
}