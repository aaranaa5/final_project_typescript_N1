import { Schema } from 'mongoose';

import { Gender, IdentificationTypes, Status } from '../types';

export const AffiliateSchema = new Schema({
  name: { type: String, required: true },
  middleName: { type: String, required: false },
  lastNames: { type: String, required: true },
  birthdate: { type: Date, required: true },
  identificationType: {
    type: String,
    required: true,
    enum: Object.values(IdentificationTypes),
  },
  id: { type: String, required: true },
  phoneNumber: { type: String, required: false },
  cellPhoneNumber: { type: String, required: true },
  postalCode: { type: String, required: true },
  address: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, required: true, enum: Object.values(Gender) },
  status: { type: String, required: true, enum: Object.values(Status) },
  socialStratum: { type: Number, required: true },
  sisben: { type: Boolean, required: true },
  requiresCompany: { type: Boolean, required: true },
});
