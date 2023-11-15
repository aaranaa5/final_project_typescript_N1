import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { IInvoice, IUpdateResponse } from './interfaces';
import { ICrud } from '../interface';
import { InvoiceStatus } from './types';

@Injectable()
export class InvoiceService implements ICrud {
  constructor(
    @Inject('INVOICE')
    private readonly InvoiceModel: Model<IInvoice>,
  ) {}

  async find(idAffiliate: string, status: InvoiceStatus): Promise<IInvoice[]> {
    return this.InvoiceModel.find({
      idAffiliate,
      status,
    });
  }

  async create(invoice: IInvoice): Promise<IInvoice> {
    const exists = await this.InvoiceModel.findOne({
      invoiceId: invoice.invoiceId,
    });

    if (exists) {
      return;
    }

    return this.InvoiceModel.create(invoice);
  }

  async update(
    idAffiliate: string,
    invoiceId: string,
  ): Promise<IUpdateResponse | { isPendingOfPayment: boolean }> {
    const invoice = await this.InvoiceModel.findOne({
      idAffiliate,
      invoiceId,
    }).exec();

    if (!invoice) {
      return;
    }

    if (invoice.status !== InvoiceStatus.PENDING_PAYMENT) {
      return {
        isPendingOfPayment: false,
      };
    }

    return this.InvoiceModel.updateOne(
      { idAffiliate, invoiceId },
      { status: InvoiceStatus.PAID },
    ) as unknown as IUpdateResponse;
  }

  async delete(
    idAffiliate: string,
    invoiceId: string,
  ): Promise<IUpdateResponse | { isPendingOfPayment: boolean }> {
    const invoice = await this.InvoiceModel.findOne({
      idAffiliate,
      invoiceId,
    }).exec();

    if (!invoice) {
      return;
    }

    if (invoice.status !== InvoiceStatus.PENDING_PAYMENT) {
      return {
        isPendingOfPayment: false,
      };
    }

    return this.InvoiceModel.updateOne(
      { idAffiliate, invoiceId },
      { status: InvoiceStatus.CANCELLED },
    ) as unknown as IUpdateResponse;
  }
}
