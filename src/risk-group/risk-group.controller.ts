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

import { RiskGroupServices } from './risk-group.services';
import {
  FindQueryParams,
  UpdateQueryParams,
  findSchema,
  riskGroupsSchema,
  updateSchema,
} from './dto';
import { IDeleteReturn, IRiskGroup } from './interfaces';

@Controller('risk-group')
export class RiskGroupControllers {
  constructor(private readonly riskGroupServices: RiskGroupServices) {}

  @Get()
  async find(@Query() findParams: FindQueryParams): Promise<IRiskGroup> {
    try {
      const { idAffiliate } = await findSchema.validateAsync(findParams);

      const createdRiskGroup = await this.riskGroupServices.find(idAffiliate);

      if (!createdRiskGroup) {
        throw new HttpException(
          `User ${idAffiliate} does not belong to any risk groups`,
          HttpStatus.NOT_FOUND,
        );
      }

      return createdRiskGroup;
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      }

      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() riskGrop: IRiskGroup): Promise<IRiskGroup> {
    try {
      const riskGroupToCreate = await riskGroupsSchema.validateAsync(riskGrop);

      const createdRiskGroupAffiliate =
        await this.riskGroupServices.create(riskGroupToCreate);

      if (!createdRiskGroupAffiliate) {
        throw new HttpException(
          `User ${riskGrop.idAffiliate} already exists`,
          HttpStatus.CONFLICT,
        );
      }

      return createdRiskGroupAffiliate;
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      }

      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch()
  async update(@Body() riskGrop: UpdateQueryParams) {
    try {
      const { idAffiliate, riskGroup } =
        await updateSchema.validateAsync(riskGrop);

      const updateResult = await this.riskGroupServices.update(
        idAffiliate,
        riskGroup,
      );

      if (!updateResult) {
        throw new HttpException(
          `User ${idAffiliate} does not belong to any risk groups`,
          HttpStatus.NOT_FOUND,
        );
      }

      return updateResult;
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      }

      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
  @HttpCode(HttpStatus.METHOD_NOT_ALLOWED)
  delete(): IDeleteReturn {
    return {
      message: 'Cannot delete risk groups from affiliate',
    };
  }
}
