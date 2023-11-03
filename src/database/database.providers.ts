import mongoose, { connect } from 'mongoose';

import { config } from '../config';

export const dataBaseProvider = [
  {
    provide: 'MONGO_DB_CONNECTION',
    useFactory: (): Promise<typeof mongoose> => connect(config.mongo.uri),
  },
];
