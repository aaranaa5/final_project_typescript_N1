import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { IDeleteReturn, IMedicalHistory, IUpdateResponse } from './interfaces';
import { ICrud } from '../interface';
import { MedicalHistoryAffiliateDTO, MedicalHistoryDTO } from './dto';

@Injectable()
export class MedicalHistoryService implements ICrud {
  constructor(
    @Inject('MEDICAL_HISTORY')
    private readonly MedicalHistory: Model<IMedicalHistory>,
  ) {}

  async find(idAffiliate: string): Promise<MedicalHistoryAffiliateDTO> {
    const medicalHistories = await this.MedicalHistory.findOne({
      idAffiliate,
    });

    if (!medicalHistories) {
      return;
    }

    return medicalHistories;
  }

  async create(medicalHistory: IMedicalHistory): Promise<IMedicalHistory> {
    const exists = await this.MedicalHistory.findOne({
      idAffiliate: medicalHistory.idAffiliate,
    });

    if (exists) {
      return;
    }

    return this.MedicalHistory.create(medicalHistory);
  }

  async update(
    idAffiliate: string,
    histories: MedicalHistoryDTO[],
  ): Promise<IUpdateResponse> {
    const medicalHistory = await this.MedicalHistory.findOne({
      idAffiliate,
    }).exec();

    if (!medicalHistory) {
      return;
    }

    return this.MedicalHistory.updateOne(
      { idAffiliate },
      { medicalHistory: histories },
    ) as unknown as IUpdateResponse;
  }

  async delete(
    idAffiliate: string,
    idHistory: string[],
  ): Promise<IDeleteReturn> {
    const medicalHistory = await this.MedicalHistory.findOne({
      idAffiliate,
    }).exec();

    if (!medicalHistory) {
      return;
    }

    const medicalHistoryToUpdate = {
      idAffiliate: medicalHistory.idAffiliate,
      medicalHistory: medicalHistory.medicalHistory.filter(
        (history) => idHistory.indexOf(history.idHistory) === -1,
      ),
    };

    const updatedResult = (await this.MedicalHistory.updateOne(
      { idAffiliate },
      medicalHistoryToUpdate,
    )) as unknown as IUpdateResponse;

    if (updatedResult.modifiedCount > 0) {
      return {
        message: `Medical histories ${idHistory} have been deleted`,
      };
    }

    return {
      message: `No medical histories have been deleted`,
    };
  }
}
