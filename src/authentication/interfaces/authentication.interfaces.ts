import { Document } from 'mongoose';

export interface IAuthentication extends Document {
  readonly user: string;
  readonly password: string;
}
