import { MedicalHistoryDTO } from './medical-history.dto';

export class FindQueryParams {
  idAffiliate: string;
}

export class UpdateQueryParams {
  idAffiliate: string;
  histories: MedicalHistoryDTO[];
}

export class DeleteQueryParams {
  idAffiliate: string;
  idHistory: string[];
}
