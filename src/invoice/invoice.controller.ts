import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { InvoiceService } from './invoice.services';
import { invoiceSchema, findSchema, updateSchema } from './dto';
import { IInvoice, IUpdateResponse } from './interfaces';
import { FindQueryParams, UpdateQueryParams } from './dto';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get()
  async find(
    @Query() idQuery: FindQueryParams,
  ): Promise<IInvoice | IInvoice[]> {
    try {
      const { idAffiliate, status } = await findSchema.validateAsync(idQuery);

      const invoice = await this.invoiceService.find(idAffiliate, status);

      if (!invoice.length) {
        throw new HttpException(
          `User: ${idAffiliate} does not have invoices with status: ${status}`,
          HttpStatus.NOT_FOUND,
        );
      }

      return invoice;
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      }

      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() invoice: IInvoice): Promise<IInvoice> {
    try {
      const invoiceToCreate = await invoiceSchema.validateAsync(invoice);

      const createdInvoice = await this.invoiceService.create(invoiceToCreate);

      if (!createdInvoice) {
        throw new HttpException(
          `Invoice: ${invoiceToCreate.invoiceId} already exists`,
          HttpStatus.CONFLICT,
        );
      }

      return createdInvoice;
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      }

      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch()
  async update(
    @Body() invoiceParams: UpdateQueryParams,
  ): Promise<IUpdateResponse> {
    try {
      const { idAffiliate, invoiceId } =
        await updateSchema.validateAsync(invoiceParams);

      const updatedInvoice = await this.invoiceService.update(
        idAffiliate,
        invoiceId,
      );

      if (!updatedInvoice) {
        throw new HttpException(
          `User: ${idAffiliate} does not have ${invoiceId} invoice to update`,
          HttpStatus.NOT_FOUND,
        );
      }

      if (
        (updatedInvoice as { isPendingOfPayment: boolean })
          .isPendingOfPayment === false
      ) {
        throw new HttpException(
          `Invoice: ${invoiceId} for user: ${idAffiliate} is not pending payment`,
          HttpStatus.CONFLICT,
        );
      }

      return updatedInvoice as IUpdateResponse;
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      }

      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
  async delete(
    @Body() invoiceParams: UpdateQueryParams,
  ): Promise<IUpdateResponse> {
    try {
      const { idAffiliate, invoiceId } =
        await updateSchema.validateAsync(invoiceParams);

      const cancelledInvoice = await this.invoiceService.delete(
        idAffiliate,
        invoiceId,
      );

      if (!cancelledInvoice) {
        throw new HttpException(
          `User: ${idAffiliate} does not have ${invoiceId} invoice to cancel`,
          HttpStatus.NOT_FOUND,
        );
      }

      if (
        (cancelledInvoice as { isPendingOfPayment: boolean })
          .isPendingOfPayment === false
      ) {
        throw new HttpException(
          `Invoice: ${invoiceId} for user: ${idAffiliate} is not pending payment, therefore cannot be cancelled`,
          HttpStatus.CONFLICT,
        );
      }

      return cancelledInvoice as IUpdateResponse;
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      }

      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
