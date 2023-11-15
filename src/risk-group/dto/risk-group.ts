export class RiskGroupDTO {
  idAffiliate: string;
  riskGroups: {
    name: string;
    appointmentFrecuencyInMonths: string;
    lastAppointment: Date;
    specialist: string[];
  };
}
