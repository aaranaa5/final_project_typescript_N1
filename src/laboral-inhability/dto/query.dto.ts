import { LaboralInhabilityStatus } from '../types';

export class FindQueryParams {
  idAffiliate: string;
  status: LaboralInhabilityStatus;
}

export class UpdateQueryParams {
  idAffiliate: string;
  description: string;
  expirationDate: Date;
  status: LaboralInhabilityStatus;
  id: string;
}

export class DeleteQueryParams {
  idAffiliate: string;
  id: string;
}
