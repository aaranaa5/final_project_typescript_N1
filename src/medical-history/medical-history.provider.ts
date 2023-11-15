import { model } from 'mongoose';

import { MedicalHistorySchema } from './schema/medical-history.schema';

export const medicalHistoryProviders = [
  {
    provide: 'MEDICAL_HISTORY',
    useFactory: () => model('medical-history', MedicalHistorySchema),
    inject: ['MONGO_DB_CONNECTION'],
  },
];
