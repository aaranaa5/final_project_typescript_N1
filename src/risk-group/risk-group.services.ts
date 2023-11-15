import { Inject, Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { IRiskGroup } from './interfaces';
import { ICrud } from 'src/interface';

@Injectable()
export class RiskGroupServices implements ICrud {
  constructor(
    @Inject('RISK_GROUP')
    private readonly RiskGroupModel: Model<IRiskGroup>,
  ) {}

  async find(idAffiliate): Promise<IRiskGroup> {
    return this.RiskGroupModel.findOne({
      idAffiliate,
    });
  }

  async create(riskGroupAffiliate: IRiskGroup): Promise<IRiskGroup> {
    const exists = await this.RiskGroupModel.findOne({
      idAffiliate: riskGroupAffiliate.idAffiliate,
    });

    if (exists) {
      return;
    }

    return this.RiskGroupModel.create(riskGroupAffiliate);
  }

  update(...args: any) {}

  delete() {}
}
