import { Module } from '@nestjs/common';

import { laboralInhabilityProviders } from './laboral-inhability.provider';
import { LaboralInhabilityService } from './laboral-inhability.services';
import { DatabaseModule } from 'src/database/database.module';
import { LaboralInhabilityController } from './laboral-inhability.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [LaboralInhabilityController],
  providers: [LaboralInhabilityService, ...laboralInhabilityProviders],
})
export class LaboralInhabilityModule {}
