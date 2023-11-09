import { InvoiceStatus } from "../types";

export class InvoiceDTO {
  idAffiliate: string;
  creationDate:  Date;
  html: string;
  status: InvoiceStatus;
  invoiceId: string;
}
