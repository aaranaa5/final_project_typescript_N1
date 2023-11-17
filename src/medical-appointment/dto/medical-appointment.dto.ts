export class MedicalAppointmentDTO {
  dateOfAppointment: Date;
  appointmentByRiskGroup: boolean;
  timeOfAppointment: string;
  clinic: string;
  city: string;
  professional: string;
  nameOfMedicOrSpecialist: string;
  idMedicOrSpecialist: string;
  requiredAuthorization: boolean;
  givenAuthorization?: boolean;
  paid: boolean;
  active: boolean;
  idAppointment: string;
}

export class MedicalAppointmentAffiliateDTO {
  idAffiliate: string;
  medicalAppointments: MedicalAppointmentDTO[];
}
