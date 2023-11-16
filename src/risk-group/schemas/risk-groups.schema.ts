import { Schema } from 'mongoose';

export const RiskGroupSchema = new Schema({
  idAffiliate: { type: String, required: true },
  riskGroups: {
    type: [
      {
        name: { type: String, required: true },
        appointmentFrecuencyInMonths: { type: String, required: true },
        lastAppointment: { type: Date, required: true },
        specialist: [
          {
            type: String,
            required: true,
          },
        ],
      },
    ],
    required: true,
  },
});
