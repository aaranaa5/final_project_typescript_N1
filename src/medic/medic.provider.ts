import { model } from 'mongoose';

import { MedicSchema } from './schema/medic.schema';

export const medicProviders = [
  {
    provide: 'MEDIC_INFO',
    useFactory: () => model('medic', MedicSchema),
    inject: ['MONGO_DB_CONNECTION'],
  },
];
