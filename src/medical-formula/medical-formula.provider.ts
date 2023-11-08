import { model } from 'mongoose';

import { MedicalFormulaAffiliateSchema } from './schema/medical-formula.schema';

export const medicalFormulaProviders = [
  {
    provide: 'MEDICAL_FORMULA',
    useFactory: () => model('medical-formula', MedicalFormulaAffiliateSchema),
    inject: ['MONGO_DB_CONNECTION'],
  },
];
