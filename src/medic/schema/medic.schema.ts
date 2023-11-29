import { Schema } from 'mongoose';

import { Gender } from '../types';

export const MedicSchema = new Schema({
  name: { type: String, required: true },
  middleName: { type: String, required: false },
  lastNames: { type: String, required: true },
  birthdate: { type: Date, required: true },
  medicId: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, required: true, enum: Object.values(Gender) },
});
