import { Document, ObjectId } from 'mongoose';

export interface IMedicalAppointment extends Document {
  idAffiliate: string;
  medicalAppointments: {
    dateOfAppointment: Date;
    appointmentByRiskGroup: boolean;
    timeOfAppointment: string;
    clinic: string;
    city: string;
    professional: string;
    nameOfMedicOrSpecialist: string;
    requiredAuthorization: boolean;
    givenAuthorization?: boolean;
    paid: boolean;
    active: boolean;
    idAppointment: string;
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
