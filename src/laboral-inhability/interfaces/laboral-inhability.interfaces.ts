import { Document, ObjectId } from 'mongoose';

export interface ILaboralInhability extends Document {
  readonly idAffiliate: string;
  readonly description: string;
  readonly expirationDate: Date;
  readonly status: string;
}

export interface IUpdateResponse {
  acknowledged: boolean;
  modifiedCount: number;
  upsertedId: ObjectId;
  upsertedCount: number;
  matchedCount: number;
}

export interface IDeleteReturn {
  acknowledged: boolean;
  deletedCount: number;
}
