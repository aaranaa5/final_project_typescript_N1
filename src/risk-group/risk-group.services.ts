import { Inject, Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { IRiskGroup } from './interfaces';
import { ICrud } from 'src/interface';
import { Risk } from './dto';

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

  async update(idAffiliate: string, riskGroup: Risk[]) {
    const exists = await this.RiskGroupModel.findOne({
      idAffiliate,
    });

    if (!exists) {
      return;
    }

    const risknames = exists.riskGroups.map((risk) => risk.name);

    const doesNotExist = riskGroup.filter(
      (risk) => risknames.indexOf(risk.name) === -1,
    );

    const riskGroupsToUpdate = {
      idAffiliate,
      riskGroups: exists.riskGroups.map((risk) => {
        const update = riskGroup.find((riskG) => riskG.name === risk.name);

        if (update) {
          return update;
        }

        return risk;
      }),
    };

    riskGroupsToUpdate.riskGroups.push(...doesNotExist);

    return this.RiskGroupModel.updateOne(
      {
        idAffiliate,
      },
      riskGroupsToUpdate,
    );
  }

  delete() {}
}
