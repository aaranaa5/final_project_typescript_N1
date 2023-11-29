import { Document } from 'mongoose';
import { Roles } from '../types/authentication.types';

export interface IAuthentication extends Document {
  readonly user: string;
  readonly password: string;
  readonly role: Roles;
}
