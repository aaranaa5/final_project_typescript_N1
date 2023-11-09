import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import {
  IInvoice,
  // IUpdateResponse,
} from './interfaces';
import { ICrud } from '../interface';
import { InvoiceStatus } from './types';

@Injectable()
export class InvoiceService implements ICrud {
  constructor(
    @Inject('INVOICE')
    private readonly InvoiceModel: Model<IInvoice>,
  ) {}

  async find(
    idAffiliate: string,
    status: InvoiceStatus
  ): Promise<IInvoice[]> {
    return this.InvoiceModel.find({
      idAffiliate,
      status
    });
  }

  async create(
    invoice: IInvoice
  ): Promise<IInvoice> {
    const exists = await this.InvoiceModel.findOne({
      invoiceId: invoice.invoiceId
    })

    if(exists) {
      return;
    }

    return this.InvoiceModel.create(invoice);
  }

  update(...args: any) {
    
  }

  delete(...args: any) {
    
  }

  // async update(
  //   medicalFormula: ICurrentMedicalFormulaAffiliate,
  // ): Promise<IUpdateResponse> {
  //   const currentMedicalFormulas = await this.MedicalFormulaModel.findOne({
  //     idAffiliate: medicalFormula.idAffiliate,
  //   }).exec();

  //   if (!currentMedicalFormulas) {
  //     return;
  //   }

  //   const updatedFormulas = {
  //     idAffiliate: currentMedicalFormulas.idAffiliate,
  //     formulas: currentMedicalFormulas.formulas.map((formula) => ({
  //       id: formula.id,
  //       html: formula.html,
  //       currentFormula: false,
  //     })),
  //   };

  //   updatedFormulas.formulas.push(medicalFormula.formulas);

  //   return this.MedicalFormulaModel.updateOne(
  //     { idAffiliate: medicalFormula.idAffiliate },
  //     updatedFormulas,
  //   ) as unknown as IUpdateResponse;
  // }

  // async delete(idAffiliate: string): Promise<IUpdateResponse> {
  //   const currentMedicalFormulas = await this.MedicalFormulaModel.findOne({
  //     idAffiliate,
  //   }).exec();

  //   if (!currentMedicalFormulas) {
  //     return;
  //   }

  //   const updatedFormulas = {
  //     idAffiliate: currentMedicalFormulas.idAffiliate,
  //     formulas: currentMedicalFormulas.formulas.map((formula) => ({
  //       id: formula.id,
  //       html: formula.html,
  //       currentFormula: false,
  //     })),
  //   };

  //   return this.MedicalFormulaModel.updateOne(
  //     { idAffiliate },
  //     updatedFormulas,
  //   ) as unknown as IUpdateResponse;
  // }
}
