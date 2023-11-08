import { Schema } from 'mongoose';

export const MedicalFormulaAffiliateSchema = new Schema({
  idAffiliate: { type: String, required: true },
  formulas: {
    type: [
      {
        id: { type: String, required: true },
        html: { type: String, required: true },
        currentFormula: { type: Boolean, required: true },
      },
    ],
    required: true,
  },
});
