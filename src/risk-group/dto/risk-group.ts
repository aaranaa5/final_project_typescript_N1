export class Risk {
  name: string;
  appointmentFrecuencyInMonths: string;
  lastAppointment: Date;
  specialist: string[];
}

export class RiskGroupDTO {
  idAffiliate: string;
  riskGroups: Risk[];
}
