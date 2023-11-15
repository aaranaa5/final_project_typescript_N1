import { Professional } from '../types';

export class MedicalHistoryDTO {
  dateOfAppointment: Date;
  appointmentByRiskGroup: boolean;
  timeOfAppointment: string;
  clinic: string;
  city: string;
  professional: Professional;
  nameOfMedicOrSpecialist: string;
  description: string;
  idMedicalFormula?: string;
  idHistory: string;
}

export class MedicalHistoryAffiliateDTO {
  idAffiliate: string;
  medicalHistory: MedicalHistoryDTO[];
}
