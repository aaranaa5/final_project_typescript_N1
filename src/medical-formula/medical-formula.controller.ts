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

import { MedicalFormulaService } from './medical-formula.services';
import { MedicalFormulaDTO } from './dto/medical-formula.dto';
import {
  IMedicalFormulaAffiliate,
  IDeleteReturn,
  IUpdateResponse,
  ICurrentMedicalFormulaAffiliate,
} from './interfaces';
import {
  medicalFormulaAffiliateSchema,
  findSchema,
  medicalFormulaUpdateAffiliateSchema,
  deleteSchema,
} from './dto/validators.dto';
import { DeleteQueryParams, FindQueryParams } from './dto';

@Controller('medical-formula')
export class MedicalFormulaController {
  constructor(private readonly medicalFormulaService: MedicalFormulaService) {}

  @Get()
  async find(
    @Query() idQuery: FindQueryParams,
  ): Promise<ICurrentMedicalFormulaAffiliate | IMedicalFormulaAffiliate> {
    try {
      const { idAffiliate, returnAll } =
        await findSchema.validateAsync(idQuery);

      const medicalFormula = await this.medicalFormulaService.find(
        idAffiliate,
        Boolean(returnAll),
      );

      if (!medicalFormula) {
        throw new HttpException(
          `User: ${idAffiliate} does not have a valid medical formula`,
          HttpStatus.NOT_FOUND,
        );
      }

      return medicalFormula;
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
    @Body() medicalFormula: MedicalFormulaDTO,
  ): Promise<IMedicalFormulaAffiliate> {
    try {
      const medicalFormulaToCreate =
        await medicalFormulaAffiliateSchema.validateAsync(medicalFormula);

      const createdMedicalFormula = await this.medicalFormulaService.create(
        medicalFormulaToCreate,
      );

      if (!createdMedicalFormula) {
        throw new HttpException(
          'Affiliate already has one or more medical formulas',
          HttpStatus.CONFLICT,
        );
      }

      return createdMedicalFormula;
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      }

      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch()
  async update(
    @Body() medicalFormula: ICurrentMedicalFormulaAffiliate,
  ): Promise<IUpdateResponse> {
    try {
      const medicalFormulaToUpdate =
        await medicalFormulaUpdateAffiliateSchema.validateAsync(medicalFormula);

      const updatedMedicalFormula = await this.medicalFormulaService.update(
        medicalFormulaToUpdate,
      );

      if (!updatedMedicalFormula) {
        throw new HttpException(
          `User: ${medicalFormula.idAffiliate} does not have medical formulas`,
          HttpStatus.NOT_FOUND,
        );
      }

      return updatedMedicalFormula;
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      }

      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
  async delete(@Query() idQuery: DeleteQueryParams): Promise<IDeleteReturn> {
    try {
      const { idAffiliate } = await deleteSchema.validateAsync(idQuery);

      const removeAllFormulasAsCurrent =
        await this.medicalFormulaService.delete(idAffiliate);

      if (!removeAllFormulasAsCurrent) {
        throw new HttpException(
          `User: ${idAffiliate} does not have medical formulas`,
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        message: `User ${idAffiliate} has been left without current medical formulas`,
      };
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      }

      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
