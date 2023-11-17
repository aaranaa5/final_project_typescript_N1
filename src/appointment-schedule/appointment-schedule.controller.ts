import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';

import { AppointmentScheduleServices } from './appointment-schedule.services';
import { FindParamsDTO, IAppointmentScheduleDTO, findParams } from './dto';

@Controller('appointment-schedule')
export class AppointmentScheduleControllers {
  constructor(
    private readonly appointmentScheduleServices: AppointmentScheduleServices,
  ) {}

  @Get()
  async find(
    @Query() queryParams: FindParamsDTO,
  ): Promise<Partial<IAppointmentScheduleDTO>> {
    try {
      const { locationId, day } = await findParams.validateAsync(queryParams);

      const appointmentSchedule = await this.appointmentScheduleServices.find(
        locationId,
        day,
      );

      if (!appointmentSchedule) {
        throw new HttpException(
          `No schedules on location: ${locationId} for day: ${day}`,
          HttpStatus.FORBIDDEN,
        );
      }

      return appointmentSchedule;
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      }

      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
