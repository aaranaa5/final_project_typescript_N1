import { Schema } from 'mongoose';
import { Professional } from '../types';

export const MedicalHistorySchema = new Schema({
  idAffiliate: { type: String, required: true },
  medicalHistory: {
    type: [
      {
        dateOfAppointment: { type: Date, required: true },
        appointmentByRiskGroup: { type: Boolean, required: true },
        timeOfAppointment: { type: String, required: true },
        clinic: { type: String, required: true },
        city: { type: String, required: true },
        professional: {
          type: String,
          enum: Object.values(Professional),
          required: true,
        },
        nameOfMedicOrSpecialist: { type: String, required: true },
        description: { type: String, required: true },
        idMedicalFormula: { type: String, required: false },
        idHistory: { type: String, required: true },
      },
    ],
    required: true,
  },
});
