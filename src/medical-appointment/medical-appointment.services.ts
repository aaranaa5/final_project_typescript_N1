import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import {
  IDeleteReturn,
  IMedicalAppointment,
  IUpdateResponse,
} from './interfaces';
import { ICrud } from '../interface';
import { MedicalAppointmentAffiliateDTO, MedicalAppointmentDTO } from './dto';

@Injectable()
export class MedicalAppointmentService implements ICrud {
  constructor(
    @Inject('MEDICAL_APPOINTMENT')
    private readonly MedicalAppointment: Model<IMedicalAppointment>,
  ) {}

  async find(
    idAffiliate: string,
    active: boolean,
  ): Promise<MedicalAppointmentAffiliateDTO> {
    const medicalAppointments = await this.MedicalAppointment.findOne({
      idAffiliate,
    });

    if (!medicalAppointments) {
      return;
    }

    return {
      idAffiliate: medicalAppointments.idAffiliate,
      medicalAppointments: medicalAppointments.medicalAppointments.filter(
        (medicalAppointment) => medicalAppointment.active === active,
      ),
    };
  }

  async findAppointmentsByMedic(id: string): Promise<any> {
    const medicalAppointments = await this.MedicalAppointment.find();

    if (!medicalAppointments.length) {
      return;
    }

    return medicalAppointments.map((appointment) => ({
      idAffiliate: appointment.idAffiliate,
      appointments: appointment.medicalAppointments.filter(
        (medicalAppointment) =>
          medicalAppointment.active === true &&
          medicalAppointment.idMedicOrSpecialist === id,
      ),
    }));
  }

  async create(
    medicalAppointment: IMedicalAppointment,
  ): Promise<IMedicalAppointment> {
    const exists = await this.MedicalAppointment.findOne({
      idAffiliate: medicalAppointment.idAffiliate,
    });

    if (exists) {
      return;
    }

    return this.MedicalAppointment.create(medicalAppointment);
  }

  async update(
    idAffiliate: string,
    appointments: MedicalAppointmentDTO[],
  ): Promise<IUpdateResponse> {
    const medicalAppointments = await this.MedicalAppointment.findOne({
      idAffiliate,
    }).exec();

    if (!medicalAppointments) {
      return;
    }

    const currentIdAppointments = medicalAppointments.medicalAppointments.map(
      (appointment) => appointment.idAppointment,
    );

    const appointmentToCreate = appointments.filter(
      (appointment) =>
        currentIdAppointments.indexOf(appointment.idAppointment) === -1,
    );

    const medicalAppointmentsToUpdate = {
      idAffiliate: medicalAppointments.idAffiliate,
      medicalAppointments: medicalAppointments.medicalAppointments.map(
        (medicalAppointment) => {
          const appointmentToUpdate = appointments.find(
            (appointment) =>
              appointment.idAppointment === medicalAppointment.idAppointment,
          );

          if (appointmentToUpdate) {
            return appointmentToUpdate;
          }

          return medicalAppointment;
        },
      ),
    };

    medicalAppointmentsToUpdate.medicalAppointments.push(
      ...appointmentToCreate,
    );

    return this.MedicalAppointment.updateOne(
      { idAffiliate },
      medicalAppointmentsToUpdate,
    ) as unknown as IUpdateResponse;
  }

  async delete(
    idAffiliate: string,
    appointmentsIds: string[],
  ): Promise<IDeleteReturn> {
    const medicalAppointments = await this.MedicalAppointment.findOne({
      idAffiliate,
    }).exec();

    if (!medicalAppointments) {
      return;
    }

    const medicalAppointmentsToUpdate = {
      idAffiliate: medicalAppointments.idAffiliate,
      medicalAppointments: medicalAppointments.medicalAppointments.map(
        (medicalAppointment) => {
          if (
            appointmentsIds.indexOf(medicalAppointment.idAppointment) !== -1
          ) {
            medicalAppointment.active = false;

            return medicalAppointment;
          }

          return medicalAppointment;
        },
      ),
    };

    const updatedResult = (await this.MedicalAppointment.updateOne(
      { idAffiliate },
      medicalAppointmentsToUpdate,
    )) as unknown as IUpdateResponse;

    if (updatedResult.modifiedCount > 0) {
      return {
        message: `Medical appointments ${appointmentsIds} have been cancelled`,
      };
    }

    return {
      message: `No medical appointments have been cancelled`,
    };
  }
}
