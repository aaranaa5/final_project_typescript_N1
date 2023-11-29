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

import { MedicServices } from './medic.services';
import { MedicDTO } from './dto/medic.dto';
import { IMedic, IDeleteReturn, IUpdateResponse } from './interfaces';
import { medicSchema, deleteSchema, findSchema } from './dto/validators.dto';
import { DeleteQueryParams, FindQueryParams } from './dto';

@Controller('medic')
export class MedicController {
  constructor(private readonly medicServices: MedicServices) {}

  @Get()
  async find(@Query() idQuery: FindQueryParams): Promise<IMedic> {
    try {
      const { medicId } = await findSchema.validateAsync(idQuery);

      const medic = await this.medicServices.find(medicId);

      if (!medic) {
        throw new HttpException(
          `Medic: ${medicId} does not exist`,
          HttpStatus.NOT_FOUND,
        );
      }

      return medic;
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      }

      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() medic: MedicDTO): Promise<IMedic> {
    try {
      const medicToCreate = await medicSchema.validateAsync(medic);

      const createdMedic = await this.medicServices.create(medicToCreate);

      if (!createdMedic) {
        throw new HttpException(
          'Affiliate already exists',
          HttpStatus.CONFLICT,
        );
      }

      return createdMedic;
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      }

      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch()
  async update(@Body() medic: MedicDTO): Promise<IUpdateResponse> {
    try {
      const medicToUpdate = await medicSchema.validateAsync(medic);

      const updatedMedic = await this.medicServices.update(medicToUpdate);

      if (updatedMedic.modifiedCount === 0) {
        throw new HttpException(
          `Medic: ${medicToUpdate.medicId} does not exist`,
          HttpStatus.NOT_FOUND,
        );
      }

      return updatedMedic;
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
      const { medicId } = await deleteSchema.validateAsync(idQuery);

      const deleteMedic = await this.medicServices.delete(medicId);

      if (deleteMedic.deletedCount === 0) {
        throw new HttpException(
          `Medic: ${medicId} does not exist`,
          HttpStatus.NOT_FOUND,
        );
      }

      return deleteMedic;
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      }

      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
