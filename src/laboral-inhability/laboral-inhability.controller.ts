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

import { LaboralInhabilityService } from './laboral-inhability.services';
import {
  laboralInhabilitySchema,
  findSchema,
  DeleteQueryParams,
  deleteSchema,
} from './dto';
import {
  IDeleteReturn,
  ILaboralInhability,
  IUpdateResponse,
} from './interfaces';
import { FindQueryParams } from './dto';

@Controller('laboral-inhability')
export class LaboralInhabilityController {
  constructor(private readonly laboralInhability: LaboralInhabilityService) {}

  @Get()
  async find(@Query() idQuery: FindQueryParams): Promise<ILaboralInhability[]> {
    try {
      const { idAffiliate, status } = await findSchema.validateAsync(idQuery);

      const laboralInhability = await this.laboralInhability.find(
        idAffiliate,
        status,
      );

      if (!laboralInhability.length) {
        throw new HttpException(
          `User: ${idAffiliate} does not have laboral inhabilities with status: ${status}`,
          HttpStatus.NOT_FOUND,
        );
      }

      return laboralInhability;
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
    @Body() laboralInhability: ILaboralInhability,
  ): Promise<ILaboralInhability> {
    try {
      const laboralInhabilityToCreate =
        await laboralInhabilitySchema.validateAsync(laboralInhability);

      const createdLaboralInhability = await this.laboralInhability.create(
        laboralInhabilityToCreate,
      );

      if (!createdLaboralInhability) {
        throw new HttpException(
          `Laboral inhability: ${createdLaboralInhability.id} already exists`,
          HttpStatus.CONFLICT,
        );
      }

      return createdLaboralInhability;
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      }

      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch()
  async update(
    @Body() laboralInhability: ILaboralInhability,
  ): Promise<IUpdateResponse> {
    try {
      const laboralInhabilityToUpdate =
        await laboralInhabilitySchema.validateAsync(laboralInhability);

      const updatedLaboralInhability = await this.laboralInhability.update(
        laboralInhabilityToUpdate,
      );

      if (!updatedLaboralInhability) {
        throw new HttpException(
          `User: ${laboralInhabilityToUpdate.idAffiliate} does not have ${laboralInhabilityToUpdate.id} laboral inhability to update`,
          HttpStatus.NOT_FOUND,
        );
      }

      return updatedLaboralInhability as IUpdateResponse;
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      }

      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
  async delete(
    @Body() deleteLaboralInhability: DeleteQueryParams,
  ): Promise<IDeleteReturn> {
    try {
      const { idAffiliate, id } = await deleteSchema.validateAsync(
        deleteLaboralInhability,
      );

      const deletedLaboralInhability = await this.laboralInhability.delete(
        idAffiliate,
        id,
      );

      if (!deletedLaboralInhability) {
        throw new HttpException(
          `User: ${deleteLaboralInhability.idAffiliate} does not have ${deleteLaboralInhability.id} laboral inhability to delete`,
          HttpStatus.NOT_FOUND,
        );
      }

      return deletedLaboralInhability as IDeleteReturn;
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      }

      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
