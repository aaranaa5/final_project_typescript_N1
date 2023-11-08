import { Document, ObjectId } from 'mongoose';

export interface IMedicalFormulaAffiliate extends Document {
  readonly idAffiliate: string;
  readonly formulas: [
    {
      readonly id: string;
      readonly html: string;
      readonly currentFormula: boolean;
    },
  ];
}

export interface ICurrentMedicalFormulaAffiliate {
  readonly idAffiliate: string;
  readonly formulas: {
    readonly id: string;
    readonly html: string;
    readonly currentFormula: boolean;
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
