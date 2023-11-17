import { Document } from 'mongoose';

export interface IDailySchedules extends Document {
  readonly '08:00': string[];
  readonly '09:00': string[];
  readonly '10:00': string[];
  readonly '11:00': string[];
  readonly '12:00': string[];
  readonly '13:00': string[];
  readonly '14:00': string[];
  readonly '15:00': string[];
  readonly '16:00': string[];
  readonly '17:00': string[];
}

export interface IAppointmentSchedule extends Document {
  readonly monday: IDailySchedules;
  readonly tuesday: IDailySchedules;
  readonly wednesday: IDailySchedules;
  readonly thursday: IDailySchedules;
  readonly friday: IDailySchedules;
  readonly saturday: IDailySchedules;
  readonly locationId: string;
}
