import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import {
  IMedicalFormulaAffiliate,
  ICurrentMedicalFormulaAffiliate,
  IUpdateResponse,
} from './interfaces';
import { ICrud } from '../interface';

@Injectable()
export class MedicalFormulaService implements ICrud {
  constructor(
    @Inject('MEDICAL_FORMULA')
    private readonly MedicalFormulaModel: Model<IMedicalFormulaAffiliate>,
  ) {}

  async find(
    idAffiliate: string,
    returnAll?: boolean,
  ): Promise<ICurrentMedicalFormulaAffiliate | IMedicalFormulaAffiliate> {
    const medicalFormula = await this.MedicalFormulaModel.findOne({
      idAffiliate,
    });

    if (!medicalFormula) {
      return;
    }

    if (returnAll) {
      return medicalFormula;
    }

    const formulas = medicalFormula.formulas.find(
      (formula) => formula.currentFormula,
    );

    return {
      idAffiliate: medicalFormula.idAffiliate,
      formulas,
    };
  }

  async create(
    medicalFormula: IMedicalFormulaAffiliate,
  ): Promise<IMedicalFormulaAffiliate> {
    const exists = await this.MedicalFormulaModel.findOne({
      idAffiliate: medicalFormula.idAffiliate,
    }).exec();

    if (exists) {
      return;
    }

    return this.MedicalFormulaModel.create(medicalFormula);
  }

  async update(
    medicalFormula: ICurrentMedicalFormulaAffiliate,
  ): Promise<IUpdateResponse> {
    const currentMedicalFormulas = await this.MedicalFormulaModel.findOne({
      idAffiliate: medicalFormula.idAffiliate,
    }).exec();

    if (!currentMedicalFormulas) {
      return;
    }

    const updatedFormulas = {
      idAffiliate: currentMedicalFormulas.idAffiliate,
      formulas: currentMedicalFormulas.formulas.map((formula) => ({
        id: formula.id,
        html: formula.html,
        currentFormula: false,
      })),
    };

    updatedFormulas.formulas.push(medicalFormula.formulas);

    return this.MedicalFormulaModel.updateOne(
      { idAffiliate: medicalFormula.idAffiliate },
      updatedFormulas,
    ) as unknown as IUpdateResponse;
  }

  async delete(idAffiliate: string): Promise<IUpdateResponse> {
    const currentMedicalFormulas = await this.MedicalFormulaModel.findOne({
      idAffiliate,
    }).exec();

    if (!currentMedicalFormulas) {
      return;
    }

    const updatedFormulas = {
      idAffiliate: currentMedicalFormulas.idAffiliate,
      formulas: currentMedicalFormulas.formulas.map((formula) => ({
        id: formula.id,
        html: formula.html,
        currentFormula: false,
      })),
    };

    return this.MedicalFormulaModel.updateOne(
      { idAffiliate },
      updatedFormulas,
    ) as unknown as IUpdateResponse;
  }
}
