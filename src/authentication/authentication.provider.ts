import { model } from 'mongoose';

import { authenticationSchema } from './schema/authentication.schema';

export const authenticationProviders = [
  {
    provide: 'AUTHENTICATION',
    useFactory: () => model('authentication', authenticationSchema),
    inject: ['MONGO_DB_CONNECTION'],
  },
];
