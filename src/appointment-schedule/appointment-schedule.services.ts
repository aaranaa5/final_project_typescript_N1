import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { IAppointmentSchedule } from './interfaces';
import { IAppointmentScheduleDTO } from './dto';

@Injectable()
export class AppointmentScheduleServices {
  constructor(
    @Inject('APPOINTMENT-SCHEDULE')
    private readonly AppointmentScheduleModel: Model<IAppointmentSchedule>,
  ) {}

  async find(
    locationId: string,
    day: string,
  ): Promise<Partial<IAppointmentScheduleDTO>> {
    const schedules = await this.AppointmentScheduleModel.findOne({
      locationId,
    });

    if (!schedules) {
      return;
    }

    return schedules[day];
  }
}
