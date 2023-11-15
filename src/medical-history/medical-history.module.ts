import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { MedicalHistoryController } from './medical-history.controller';
import { MedicalHistoryService } from './medical-history.services';
import { medicalHistoryProviders } from './medical-history.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [MedicalHistoryController],
  providers: [MedicalHistoryService, ...medicalHistoryProviders],
})
export class MedicalHistoryModule {}
