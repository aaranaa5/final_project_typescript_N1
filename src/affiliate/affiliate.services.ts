import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { IAffiliate, IUpdateResponse } from './interfaces';
import { ICrud } from '../interface';
import { Status } from './types';

@Injectable()
export class AffiliateService implements ICrud {
  constructor(
    @Inject('AFFILIATE_INFO')
    private readonly AffiliateModel: Model<IAffiliate>,
  ) {}

  async find(id: string) {
    return this.AffiliateModel.findOne({ id });
  }

  async create(affiliate: IAffiliate): Promise<IAffiliate> {
    const exists = await this.AffiliateModel.findOne({
      id: affiliate.id,
    }).exec();

    if (exists) {
      return;
    }

    return this.AffiliateModel.create(affiliate);
  }

  async update(affiliate: IAffiliate): Promise<IUpdateResponse> {
    return this.AffiliateModel.updateOne(
      { id: affiliate.id },
      affiliate,
    ) as unknown as IUpdateResponse;
  }

  async delete(id: string): Promise<IUpdateResponse> {
    return this.AffiliateModel.updateOne(
      { id },
      { status: Status.DISABLED },
    ) as unknown as IUpdateResponse;
  }
}
