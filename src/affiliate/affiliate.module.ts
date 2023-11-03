import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { AffiliateController } from './affiliate.controller';
import { AffiliateService } from './affiliate.services';
import { affiliateProviders } from './affiliate.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [AffiliateController],
  providers: [AffiliateService, ...affiliateProviders],
})
export class AffiliateModule {}
