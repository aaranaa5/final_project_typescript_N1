import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { medicalAppointmentProviders } from './medical-appointment.provider';
import { MedicalAppointmentController } from './medical-appointment.controller';
import { MedicalAppointmentService } from './medical-appointment.services';

@Module({
  imports: [DatabaseModule],
  controllers: [MedicalAppointmentController],
  providers: [MedicalAppointmentService, ...medicalAppointmentProviders],
})
export class MedicalAppointmentModule {}
