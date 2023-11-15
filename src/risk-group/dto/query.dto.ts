import { RiskGroupDTO } from './risk-group';

export class FindQueryParams {
  idAffiliate: string;
}

export class UpdateQueryParams {
  idAffiliate: string;
  riskGroup: RiskGroupDTO[];
}
