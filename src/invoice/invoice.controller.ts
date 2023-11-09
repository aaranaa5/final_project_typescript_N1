import {
  Body,
  Controller,
  // Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  // Patch,
  Post,
  Query,
} from '@nestjs/common';

import { InvoiceService } from './invoice.services';
import { InvoiceDTO } from './dto/invoice.dto';
import {
  IInvoice,
  // IDeleteReturn,
  // IUpdateResponse,
} from './interfaces';
import {
  invoiceSchema,
  findSchema,
  // deleteSchema,
} from './dto/validators.dto';
import { /*DeleteQueryParams,*/ FindQueryParams } from './dto';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get()
  async find(
    @Query() idQuery: FindQueryParams,
  ): Promise<IInvoice | IInvoice[]> {
    try {
      const { idAffiliate, status } =
        await findSchema.validateAsync(idQuery);

      const invoice = await this.invoiceService.find(
        idAffiliate,
        status
      );

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
  async create(
    @Body() invoice: IInvoice
  ): Promise<IInvoice> {
    try {
      const invoiceToCreate = await invoiceSchema.validateAsync(invoice);

      const createdInvoice = await this.invoiceService.create(invoiceToCreate);

      if(!createdInvoice) {
        throw new HttpException(`Invoice: ${invoiceToCreate.invoiceId} already exists`, HttpStatus.CONFLICT);
      }
      
      return createdInvoice;
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      }

      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  // @Patch()
  // async update(
  //   @Body() medicalFormula: ICurrentMedicalFormulaAffiliate,
  // ): Promise<IUpdateResponse> {
  //   try {
  //     const medicalFormulaToUpdate =
  //       await medicalFormulaUpdateAffiliateSchema.validateAsync(medicalFormula);

  //     const updatedMedicalFormula = await this.medicalFormulaService.update(
  //       medicalFormulaToUpdate,
  //     );

  //     if (!updatedMedicalFormula) {
  //       throw new HttpException(
  //         `User: ${medicalFormula.idAffiliate} does not have medical formulas`,
  //         HttpStatus.NOT_FOUND,
  //       );
  //     }

  //     return updatedMedicalFormula;
  //   } catch (err) {
  //     if (err instanceof HttpException) {
  //       throw new HttpException(err.message, err.getStatus());
  //     }

  //     throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
  //   }
  // }

  // @Delete()
  // async delete(@Query() idQuery: DeleteQueryParams): Promise<IDeleteReturn> {
  //   try {
  //     const { idAffiliate } = await deleteSchema.validateAsync(idQuery);

  //     const removeAllFormulasAsCurrent =
  //       await this.medicalFormulaService.delete(idAffiliate);

  //     if (!removeAllFormulasAsCurrent) {
  //       throw new HttpException(
  //         `User: ${idAffiliate} does not have medical formulas`,
  //         HttpStatus.NOT_FOUND,
  //       );
  //     }

  //     return {
  //       message: `User ${idAffiliate} has been left without current medical formulas`,
  //     };
  //   } catch (err) {
  //     if (err instanceof HttpException) {
  //       throw new HttpException(err.message, err.getStatus());
  //     }

  //     throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
  //   }
  // }
}
