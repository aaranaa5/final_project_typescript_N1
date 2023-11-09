import { Schema } from 'mongoose';
import { InvoiceStatus } from '../types';

export const InvoiceSchema = new Schema({
  idAffiliate: { type: String, required: true },
  creationDate:  { type: Date, required: true },
  html: { type: String, required: true },
  status: { type: String, enum: Object.values(InvoiceStatus), required: true },
  invoiceId: { type: String, required: true },
});
