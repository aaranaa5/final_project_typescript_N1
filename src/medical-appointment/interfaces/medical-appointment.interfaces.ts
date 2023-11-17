import { Document, ObjectId } from 'mongoose';

export interface IMedicalAppointment extends Document {
  readonly idAffiliate: string;
  readonly medicalAppointments: {
    readonly dateOfAppointment: Date;
    readonly appointmentByRiskGroup: boolean;
    readonly timeOfAppointment: string;
    readonly clinic: string;
    readonly city: string;
    readonly professional: string;
    readonly nameOfMedicOrSpecialist: string;
    readonly idMedicOrSpecialist: string;
    readonly requiredAuthorization: boolean;
    readonly givenAuthorization?: boolean;
    readonly paid: boolean;
    active: boolean;
    readonly idAppointment: string;
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
