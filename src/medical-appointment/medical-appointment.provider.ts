import { model } from 'mongoose';

import { MedicalAppointmentSchema } from './schema/medical-appointment.schema';

export const medicalAppointmentProviders = [
  {
    provide: 'MEDICAL_APPOINTMENT',
    useFactory: () => model('medical-appointment', MedicalAppointmentSchema),
    inject: ['MONGO_DB_CONNECTION'],
  },
];
