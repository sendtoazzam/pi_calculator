import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import {
  HealthCheckService,
  HealthIndicatorResult,
  MongooseHealthIndicator,
} from '@nestjs/terminus';
import { HealthCheckResult } from '@nestjs/terminus/dist/health-check';

@Controller('health')
@ApiBearerAuth('x-auth-user-data')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly mongooseHealth: MongooseHealthIndicator, // NOTE: enable this if using mongodb
  ) {}

  @Get()
  async index(): Promise<HealthCheckResult> {
    return this.health.check([
      (): Promise<HealthIndicatorResult> =>
        this.mongooseHealth.pingCheck('mongodb'),
    ]);
  }
}
