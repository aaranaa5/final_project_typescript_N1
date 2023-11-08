export class MedicalFormula {
  id: string;
  html: string;
  currentFormula: boolean;
}

export class MedicalFormulaDTO {
  idAffiliate: string;
  formulas: MedicalFormula[];
}
