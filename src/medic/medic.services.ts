import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { IDeleteReturn, IMedic, IUpdateResponse } from './interfaces';
import { ICrud } from '../interface';

@Injectable()
export class MedicServices implements ICrud {
  constructor(
    @Inject('MEDIC_INFO')
    private readonly medicModel: Model<IMedic>,
  ) {}

  async find(medicId: string) {
    return this.medicModel.findOne({ medicId });
  }

  async create(medic: IMedic): Promise<IMedic> {
    const exists = await this.medicModel
      .findOne({
        id: medic.medicId,
      })
      .exec();

    if (exists) {
      return;
    }

    return this.medicModel.create(medic);
  }

  async update(medic: IMedic): Promise<IUpdateResponse> {
    return this.medicModel.updateOne(
      { id: medic.medicId },
      medic,
    ) as unknown as IUpdateResponse;
  }

  async delete(medicId: string): Promise<IDeleteReturn> {
    return this.medicModel.deleteOne({ medicId }) as unknown as IDeleteReturn;
  }
}
