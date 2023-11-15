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

import {
  medicalHistoryAffiliateSchema,
  findSchema,
  updateSchema,
  DeleteQueryParams,
  deleteSchema,
  MedicalHistoryAffiliateDTO,
} from './dto';
import { IDeleteReturn, IMedicalHistory, IUpdateResponse } from './interfaces';
import { FindQueryParams, UpdateQueryParams } from './dto';
import { MedicalHistoryService } from './medical-history.services';

@Controller('medical-history')
export class MedicalHistoryController {
  constructor(private readonly medicalHistoryServices: MedicalHistoryService) {}

  @Get()
  async find(
    @Query() queries: FindQueryParams,
  ): Promise<MedicalHistoryAffiliateDTO> {
    try {
      const { idAffiliate } = await findSchema.validateAsync(queries);

      const medicalHistory =
        await this.medicalHistoryServices.find(idAffiliate);

      if (!medicalHistory) {
        throw new HttpException(
          `User: ${idAffiliate} does not have any medical history`,
          HttpStatus.NOT_FOUND,
        );
      }

      return medicalHistory;
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
    @Body() medicalHistory: IMedicalHistory,
  ): Promise<IMedicalHistory> {
    try {
      const medicalHistoryToCreate =
        await medicalHistoryAffiliateSchema.validateAsync(medicalHistory);

      const createdMedicalHistory = await this.medicalHistoryServices.create(
        medicalHistoryToCreate,
      );

      if (!createdMedicalHistory) {
        throw new HttpException(
          `Medical histories for: ${medicalHistory.idAffiliate} already exist`,
          HttpStatus.CONFLICT,
        );
      }

      return createdMedicalHistory;
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      }

      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch()
  async update(
    @Body() medicalHistoryParams: UpdateQueryParams,
  ): Promise<IUpdateResponse> {
    try {
      const { idAffiliate, histories } =
        await updateSchema.validateAsync(medicalHistoryParams);

      const updatedMedicalHistory = await this.medicalHistoryServices.update(
        idAffiliate,
        histories,
      );

      if (!updatedMedicalHistory) {
        throw new HttpException(
          `User: ${idAffiliate} does not have medical histories to update`,
          HttpStatus.NOT_FOUND,
        );
      }

      return updatedMedicalHistory as IUpdateResponse;
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      }

      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
  async delete(
    @Body() medicalHistoryParams: DeleteQueryParams,
  ): Promise<IDeleteReturn> {
    try {
      const { idAffiliate, idHistory } =
        await deleteSchema.validateAsync(medicalHistoryParams);

      const deletedHistories = await this.medicalHistoryServices.delete(
        idAffiliate,
        idHistory,
      );

      if (!deletedHistories) {
        throw new HttpException(
          `User: ${idAffiliate} does not have ${idHistory} histories to cancel`,
          HttpStatus.NOT_FOUND,
        );
      }

      return deletedHistories as IDeleteReturn;
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      }

      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
