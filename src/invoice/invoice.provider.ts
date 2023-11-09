import { model } from 'mongoose';

import { InvoiceSchema } from './schema/invoice.schema';

export const invoiceProviders = [
  {
    provide: 'INVOICE',
    useFactory: () => model('invoice', InvoiceSchema),
    inject: ['MONGO_DB_CONNECTION'],
  },
];
