import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import {
  medicalAppointmentsAffiliateSchema,
  MedicalAppointmentAffiliateDTO,
  findSchema,
  updateSchema,
  DeleteQueryParams,
  deleteSchema,
  findByMedicSchema,
} from './dto';
import {
  IDeleteReturn,
  IMedicalAppointment,
  IUpdateResponse,
} from './interfaces';
import { FindQueryParams, UpdateQueryParams } from './dto';
import { MedicalAppointmentService } from './medical-appointment.services';

@Controller('medical-appointment')
export class MedicalAppointmentController {
  constructor(
    private readonly medicalAppointmentServices: MedicalAppointmentService,
  ) {}

  @Get()
  async find(
    @Query() queries: FindQueryParams,
  ): Promise<MedicalAppointmentAffiliateDTO> {
    try {
      const { idAffiliate, active } = await findSchema.validateAsync(queries);

      const medicalAppointment = await this.medicalAppointmentServices.find(
        idAffiliate,
        active,
      );

      if (!medicalAppointment) {
        throw new HttpException(
          `User: ${idAffiliate} does not have any appointments registered under any status`,
          HttpStatus.NOT_FOUND,
        );
      }

      return medicalAppointment;
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      }

      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async findByMedic(@Param('id') id: string): Promise<any> {
    try {
      await findByMedicSchema.validateAsync(id);

      const medicalAppointment =
        await this.medicalAppointmentServices.findAppointmentsByMedic(id);

      if (!medicalAppointment) {
        throw new HttpException(
          `Medic: ${id} does not have any appointments active`,
          HttpStatus.NOT_FOUND,
        );
      }

      return medicalAppointment;
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
    @Body() medicalAppointment: IMedicalAppointment,
  ): Promise<IMedicalAppointment> {
    try {
      const medicalAppointmentToCreate =
        await medicalAppointmentsAffiliateSchema.validateAsync(
          medicalAppointment,
        );

      const createdInvoice = await this.medicalAppointmentServices.create(
        medicalAppointmentToCreate,
      );

      if (!createdInvoice) {
        throw new HttpException(
          `Invoice: ${medicalAppointmentToCreate.idAffiliate} already exists`,
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
    @Body() medicalAppointmentParams: UpdateQueryParams,
  ): Promise<IUpdateResponse> {
    try {
      const { idAffiliate, appointments } = await updateSchema.validateAsync(
        medicalAppointmentParams,
      );

      const updatedMedicalAppointments =
        await this.medicalAppointmentServices.update(idAffiliate, appointments);

      if (!updatedMedicalAppointments) {
        throw new HttpException(
          `User: ${idAffiliate} does not have medical appointments to update`,
          HttpStatus.NOT_FOUND,
        );
      }

      return updatedMedicalAppointments as IUpdateResponse;
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      }

      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
  async delete(
    @Body() medicalAppointmentParams: DeleteQueryParams,
  ): Promise<IDeleteReturn> {
    try {
      const { idAffiliate, idAppointment } = await deleteSchema.validateAsync(
        medicalAppointmentParams,
      );

      const cancelledAppointments =
        await this.medicalAppointmentServices.delete(
          idAffiliate,
          idAppointment,
        );

      if (!cancelledAppointments) {
        throw new HttpException(
          `User: ${idAffiliate} does not have ${idAppointment} invoice to cancel`,
          HttpStatus.NOT_FOUND,
        );
      }

      return cancelledAppointments as IDeleteReturn;
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      }

      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
