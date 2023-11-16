import { model } from 'mongoose';

import { laboralInhabilitySchema } from './schema/laboral-inhability.schema';

export const laboralInhabilityProviders = [
  {
    provide: 'LABORAL_INHABILITY',
    useFactory: () => model('laboral-inhability', laboralInhabilitySchema),
    inject: ['MONGO_DB_CONNECTION'],
  },
];
