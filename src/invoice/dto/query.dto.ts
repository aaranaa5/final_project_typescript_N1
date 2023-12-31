import { InvoiceStatus } from '../types';

export class FindQueryParams {
  idAffiliate: string;
  status: InvoiceStatus;
}

export class UpdateQueryParams {
  idAffiliate: string;
  invoiceId: string;
}

export class DeleteQueryParams {
  idAffiliate: string;
}
