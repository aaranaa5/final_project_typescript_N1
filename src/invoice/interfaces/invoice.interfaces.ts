import { Document, ObjectId } from 'mongoose';

export interface IInvoice extends Document {
  readonly idAffiliate: string;
  readonly creationDate: Date;
  readonly html: string;
  readonly status: string;
  readonly invoiceId: string;
}

export interface IUpdateResponse {
  acknowledged: boolean;
  modifiedCount: number;
  upsertedId: ObjectId;
  upsertedCount: number;
  matchedCount: number;
}

export interface IDeleteReturn {
  message: string;
}
