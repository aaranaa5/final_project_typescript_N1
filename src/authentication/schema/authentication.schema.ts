import { Schema } from 'mongoose';
import { Roles } from '../types/authentication.types';

export const authenticationSchema = new Schema({
  user: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: Object.values(Roles) }
});
