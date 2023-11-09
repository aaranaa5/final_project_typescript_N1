import { InvoiceStatus } from "../types";

export class FindQueryParams {
  idAffiliate: string;
  status: InvoiceStatus
}

export class DeleteQueryParams {
  idAffiliate: string;
}
