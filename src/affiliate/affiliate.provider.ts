import { model } from 'mongoose';

import { AffiliateSchema } from './schema/affiliate.schema';

export const affiliateProviders = [
  {
    provide: 'AFFILIATE_INFO',
    useFactory: () => model('affiliate', AffiliateSchema),
    inject: ['MONGO_DB_CONNECTION'],
  },
];
