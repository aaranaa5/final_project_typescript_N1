import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AffiliateModule } from './affiliate/affiliate.module';
import { DatabaseModule } from './database/database.module';
import { MedicalFormulaModule } from './medical-formula/medical-formula.module';
import { InvoiceModule } from './invoice/invoice.module';
import { MedicalAppointmentModule } from './medical-appointment/medical-appointment.module';
import { MedicalHistoryModule } from './medical-history/medical-history.module';
import { RiskGroupModule } from './risk-group/risk-group.module';
import { LaboralInhabilityModule } from './laboral-inhability/laboral-inhability.module';

@Module({
  imports: [
    AffiliateModule,
    DatabaseModule,
    MedicalFormulaModule,
    InvoiceModule,
    MedicalAppointmentModule,
    MedicalHistoryModule,
    RiskGroupModule,
    LaboralInhabilityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
