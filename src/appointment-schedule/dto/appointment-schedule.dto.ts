import { Days } from '../types';

export class DailySchedulesDTO {
  '08:00': string[];
  '09:00': string[];
  '10:00': string[];
  '11:00': string[];
  '12:00': string[];
  '13:00': string[];
  '14:00': string[];
  '15:00': string[];
  '16:00': string[];
  '17:00': string[];
}

export class IAppointmentScheduleDTO {
  monday: DailySchedulesDTO;
  tuesday: DailySchedulesDTO;
  wednesday: DailySchedulesDTO;
  thursday: DailySchedulesDTO;
  friday: DailySchedulesDTO;
  saturday: DailySchedulesDTO;
  locationId: string;
}

export class FindParamsDTO {
  locationId: string;
  day: Days;
}
