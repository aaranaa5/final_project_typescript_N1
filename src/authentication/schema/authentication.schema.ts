import { Schema } from 'mongoose';

export const authenticationSchema = new Schema({
  user: { type: String, required: true },
  password: { type: String, required: true },
});
