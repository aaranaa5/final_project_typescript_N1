import { Schema } from 'mongoose';

export const MedicalAppointmentSchema = new Schema({
  idAffiliate: { type: String, required: true },
  medicalAppointments: {
    type: [
      {
        dateOfAppointment: { type: Date, required: true },
        appointmentByRiskGroup: { type: Boolean, required: true },
        timeOfAppointment: { type: String, required: true },
        clinic: { type: String, required: true },
        city: { type: String, required: true },
        professional: { type: String, required: true },
        nameOfMedicOrSpecialist: { type: String, required: true },
        idMedicOrSpecialist: { type: String, required: true },
        requiredAuthorization: { type: Boolean, required: true },
        givenAuthorization: { type: Boolean, required: false },
        paid: { type: Boolean, required: true },
        active: { type: Boolean, required: true },
        idAppointment: { type: String, required: true },
      },
    ],
    required: true,
  },
});
