import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { MedicalFormulaController } from './medical-formula.controller';
import { MedicalFormulaService } from './medical-formula.services';
import { medicalFormulaProviders } from './medical-formula.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [MedicalFormulaController],
  providers: [MedicalFormulaService, ...medicalFormulaProviders],
})
export class MedicalFormulaModule {}
