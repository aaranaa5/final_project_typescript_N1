import { Document, ObjectId } from 'mongoose';

export interface IAffiliate extends Document {
  readonly name: string;
  readonly middleName?: string;
  readonly lastNames: string;
  readonly birthdate: Date;
  readonly identificationType: string;
  readonly id: string;
  readonly phoneNumber?: string;
  readonly cellPhoneNumber: string;
  readonly postalCode: string;
  readonly address: string;
  readonly country: string;
  readonly city: string;
  readonly email: string;
  readonly gender: string;
  readonly status: string;
  readonly socialStratum: number;
  readonly sisben: boolean;
  readonly requiresCompany: boolean;
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
