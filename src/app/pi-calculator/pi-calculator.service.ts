import { Injectable } from '@nestjs/common';
import { AuthUser } from 'src/common/type/auth-user.type';
import { PiCalculator } from './pi-calculator.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PiQueryFilter } from './query-filter/pi.query-filter';
import { Pagination } from 'src/common/pagination/pagination';

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

  async findAll(
    qs: PiQueryFilter,
    paginationMeta: boolean = false,
  ): Promise<PiCalculator[] | Pagination> {
    const conditions = {
      deleted: false,
    };

    return paginationMeta
      ? await qs.getPagination(this.piModel, conditions)
      : await qs.setMongooseQuery(this.piModel, conditions);
  }

  async paginationMeta(
    qs: PiQueryFilter,
    paginationMeta: boolean = false,
  ): Promise<PiCalculator[] | Pagination> {
    const conditions = {
      deleted: false,
    };

    return paginationMeta
      ? await qs.getPagination(this.piModel, conditions)
      : await qs.setMongooseQuery(this.piModel, conditions);
  }

  async getPi(): Promise<number> {
    const getData = await this.piModel.findOne().sort({ createdAt: -1 });
    return parseFloat(getData.piValue);
  }

  async getSunCircumference(): Promise<number> {
    const radius = await this.getSunRadius();
    const curPi = await this.getPi();
    // C = 2πr;
    const sunCircumference = 2 * curPi * radius;
    return Number(sunCircumference).toFixed(3) as unknown as number;
  }

  private getSunRadius(): number {
    const sunRadius: number = 432288; // in miles;

    /* convert the miles to inches with this formula
     * r = ((sunRadius) * (5280 / 1)) * (12/1)
     */
    const convert = sunRadius * (5280 / 1) * (12 / 1);
    return convert;
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
