import { MedicalAppointmentDTO } from './medical-appointment.dto';

export class FindQueryParams {
  idAffiliate: string;
  active: boolean;
}

export class FindByMedicQueryParams {
  id: string;
}

export class UpdateQueryParams {
  idAffiliate: string;
  appointments: MedicalAppointmentDTO[];
}

export class DeleteQueryParams {
  idAffiliate: string;
  idAppointment: string[];
}
