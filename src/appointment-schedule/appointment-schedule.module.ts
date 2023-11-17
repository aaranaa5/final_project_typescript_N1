import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AppointmentScheduleControllers } from './appointment-schedule.controller';
import { AppointmentScheduleServices } from './appointment-schedule.services';
import { appointmentScheduleProviders } from './appointment-schedule.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [AppointmentScheduleControllers],
  providers: [AppointmentScheduleServices, ...appointmentScheduleProviders],
})
export class AppointmentScheduleModule {}
