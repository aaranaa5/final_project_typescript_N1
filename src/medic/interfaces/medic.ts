import { Document, ObjectId } from 'mongoose';

export interface IMedic extends Document {
  readonly name: string;
  readonly middleName?: string;
  readonly lastNames: string;
  readonly birthdate: Date;
  readonly medicId: string;
  readonly email: string;
  readonly gender: string;
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
