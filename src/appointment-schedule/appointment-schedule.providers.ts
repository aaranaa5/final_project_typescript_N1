import { model } from 'mongoose';

import { AppointmentScheduleSchema } from './schema/appointment-schedule.schema';

export const appointmentScheduleProviders = [
  {
    provide: 'APPOINTMENT-SCHEDULE',
    useFactory: () => model('appointment-schedule', AppointmentScheduleSchema),
    inject: ['MONGO_DB_CONNECTION'],
  },
];
