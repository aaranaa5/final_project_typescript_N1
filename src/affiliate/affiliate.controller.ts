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

import { AffiliateService } from './affiliate.services';
import { AffiliateDTO } from './dto/affiliate.dto';
import { IAffiliate, IDeleteReturn, IUpdateResponse } from './interfaces';
import {
  affiliateSchema,
  deleteSchema,
  findSchema,
} from './dto/validators.dto';
import { DeleteQueryParams, FindQueryParams } from './dto';
import { Status } from './types';

@Controller('affiliate')
export class AffiliateController {
  constructor(private readonly affiliateService: AffiliateService) {}

  @Get()
  async find(@Query() idQuery: FindQueryParams): Promise<IAffiliate> {
    try {
      const { id } = await findSchema.validateAsync(idQuery);

      const affiliate = await this.affiliateService.find(id);

      if (!affiliate) {
        throw new HttpException(
          `User: ${id} does not exist`,
          HttpStatus.NOT_FOUND,
        );
      }

      return affiliate;
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      }

      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() affiliate: AffiliateDTO): Promise<IAffiliate> {
    try {
      const affiliateToCreate = await affiliateSchema.validateAsync(affiliate);

      if (affiliateToCreate.status === Status.DISABLED) {
        throw new HttpException(
          `User: ${affiliateToCreate.id} is currently disabled`,
          HttpStatus.FORBIDDEN,
        );
      }

      const createdAffiliate =
        await this.affiliateService.create(affiliateToCreate);

      if (!createdAffiliate) {
        throw new HttpException(
          'Affiliate already exists',
          HttpStatus.CONFLICT,
        );
      }

      return createdAffiliate;
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      }

      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch()
  async update(@Body() affiliate: AffiliateDTO): Promise<IUpdateResponse> {
    try {
      const affiliateToUpdate = await affiliateSchema.validateAsync(affiliate);

      if (affiliateToUpdate.status === Status.DISABLED) {
        throw new HttpException(
          `User: ${affiliateToUpdate.id} is currently disabled`,
          HttpStatus.FORBIDDEN,
        );
      }

      const updatedAffiliate =
        await this.affiliateService.update(affiliateToUpdate);

      if (updatedAffiliate.modifiedCount === 0) {
        throw new HttpException(
          `User: ${affiliateToUpdate.id} does not exist`,
          HttpStatus.NOT_FOUND,
        );
      }

      return updatedAffiliate;
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
      const { id, status } = await deleteSchema.validateAsync(idQuery);

      if (status === Status.DISABLED) {
        throw new HttpException(
          `User: ${id} is currently disabled`,
          HttpStatus.FORBIDDEN,
        );
      }

      const disableUser = await this.affiliateService.delete(id);

      if (disableUser.modifiedCount === 0) {
        throw new HttpException(
          `User: ${id} does not exist`,
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        message: `User ${id} has been disabled`,
      };
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      }

      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
