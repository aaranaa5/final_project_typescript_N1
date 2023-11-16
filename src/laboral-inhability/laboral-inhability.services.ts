import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import {
  IDeleteReturn,
  ILaboralInhability,
  IUpdateResponse,
} from './interfaces';
import { ICrud } from '../interface';
import { LaboralInhabilityStatus } from './types';

@Injectable()
export class LaboralInhabilityService implements ICrud {
  constructor(
    @Inject('LABORAL_INHABILITY')
    private readonly LaboralInhabilityModel: Model<ILaboralInhability>,
  ) {}

  async find(
    idAffiliate: string,
    status: LaboralInhabilityStatus,
  ): Promise<ILaboralInhability[]> {
    return this.LaboralInhabilityModel.find({
      idAffiliate,
      status,
    });
  }

  async create(
    laboralInhability: ILaboralInhability,
  ): Promise<ILaboralInhability> {
    const exists = await this.LaboralInhabilityModel.findOne({
      idAffiliate: laboralInhability.idAffiliate,
      id: laboralInhability.id,
    });

    if (exists) {
      return;
    }

    return this.LaboralInhabilityModel.create(laboralInhability);
  }

  async update(
    laboralInhability: ILaboralInhability,
  ): Promise<IUpdateResponse> {
    const invoice = await this.LaboralInhabilityModel.findOne({
      idAffiliate: laboralInhability.idAffiliate,
      id: laboralInhability.id,
    }).exec();

    if (!invoice) {
      return;
    }

    return this.LaboralInhabilityModel.updateOne(
      { idAffiliate: laboralInhability.idAffiliate, id: laboralInhability.id },
      laboralInhability,
    ) as unknown as IUpdateResponse;
  }

  async delete(idAffiliate: string, id: string): Promise<IDeleteReturn> {
    const invoice = await this.LaboralInhabilityModel.findOne({
      idAffiliate,
      id,
    }).exec();

    if (!invoice) {
      return;
    }

    return this.LaboralInhabilityModel.deleteOne({
      idAffiliate,
      id,
    }) as unknown as IDeleteReturn;
  }
}
