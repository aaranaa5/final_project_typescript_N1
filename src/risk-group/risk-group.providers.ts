import { model } from 'mongoose';
import { RiskGroupSchema } from './schemas';

export const riskGroupProviders = [
  {
    provide: 'RISK_GROUP',
    useFactory: () => model('risk-group', RiskGroupSchema),
    inject: ['MONGO_DB_CONNECTION'],
  },
];
