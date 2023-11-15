import { Document, ObjectId } from 'mongoose';
import { Professional } from '../types';

export interface IMedicalHistory extends Document {
  readonly idAffiliate: string;
  readonly medicalHistory: {
    readonly dateOfAppointment: Date;
    readonly appointmentByRiskGroup: boolean;
    readonly timeOfAppointment: string;
    readonly clinic: string;
    readonly city: string;
    readonly professional: Professional;
    readonly nameOfMedicOrSpecialist: string;
    readonly description: string;
    readonly idMedicalFormula?: string;
    readonly idHistory: string;
  }[];
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
