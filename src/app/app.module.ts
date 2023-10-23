import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { PiCalculatorModule } from './pi-calculator/pi-calculator.module';
import { AuthModule } from './auth/auth.module';
import { SeedService } from './seed.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, usersSchema } from './auth/users.model';
import { PiCalculatorService } from './pi-calculator/pi-calculator.service';
import {
  PiCalculator,
  PiCalculatorSchema,
} from './pi-calculator/pi-calculator.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: usersSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: PiCalculator.name,
        schema: PiCalculatorSchema,
      },
    ]),
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    HealthModule,
    PiCalculatorModule,
    AuthModule,
  ],
  providers: [SeedService, PiCalculatorService],
})
export class AppModule {}
