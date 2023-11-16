import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { RiskGroupControllers } from './risk-group.controller';
import { RiskGroupServices } from './risk-group.services';
import { riskGroupProviders } from './risk-group.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [RiskGroupControllers],
  providers: [RiskGroupServices, ...riskGroupProviders],
})
export class RiskGroupModule {}
