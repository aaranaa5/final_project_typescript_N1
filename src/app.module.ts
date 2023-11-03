import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AffiliateModule } from './affiliate/affiliate.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [AffiliateModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
