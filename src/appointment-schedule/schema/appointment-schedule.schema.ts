import { Schema } from 'mongoose';

const DailySchedulesSchema = new Schema({
  '08:00': [{ type: String, required: true }],
  '09:00': [{ type: String, required: true }],
  '10:00': [{ type: String, required: true }],
  '11:00': [{ type: String, required: true }],
  '12:00': [{ type: String, required: true }],
  '13:00': [{ type: String, required: true }],
  '14:00': [{ type: String, required: true }],
  '15:00': [{ type: String, required: true }],
  '16:00': [{ type: String, required: true }],
  '17:00': [{ type: String, required: true }],
});

export const AppointmentScheduleSchema = new Schema({
  monday: { type: DailySchedulesSchema, required: true },
  tuesday: { type: DailySchedulesSchema, required: true },
  wednesday: { type: DailySchedulesSchema, required: true },
  thursday: { type: DailySchedulesSchema, required: true },
  friday: { type: DailySchedulesSchema, required: true },
  saturday: { type: DailySchedulesSchema, required: true },
  locationId: { type: String, required: true },
});
