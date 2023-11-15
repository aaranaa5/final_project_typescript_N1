import { Document, ObjectId } from 'mongoose';

export interface IRiskGroup extends Document {
  readonly idAffiliate: string;
  readonly riskGroups: {
    readonly name: string;
    readonly appointmentFrecuencyInMonths: string;
    readonly lastAppointment: Date;
    readonly specialist: string[];
  };
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
