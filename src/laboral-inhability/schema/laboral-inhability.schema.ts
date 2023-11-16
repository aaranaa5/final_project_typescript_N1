import { Schema } from 'mongoose';
import { LaboralInhabilityStatus } from '../types';

export const laboralInhabilitySchema = new Schema({
  idAffiliate: { type: String, required: true },
  description: { type: String, required: true },
  expirationDate: { type: Date, required: true },
  status: {
    type: String,
    enum: Object.values(LaboralInhabilityStatus),
    required: true,
  },
  id: { type: String, required: true },
});
