import * as Joi from 'joi';
import { Professional } from '../types';

export const findSchema = Joi.object({
  idAffiliate: Joi.string().required(),
});

export const deleteSchema = Joi.object({
  idAffiliate: Joi.string().required(),
  idHistory: Joi.array().items(Joi.string().required()),
});

export const medicalHistorySchema = Joi.object({
  dateOfAppointment: Joi.date().required(),
  appointmentByRiskGroup: Joi.boolean().required(),
  timeOfAppointment: Joi.string().required(),
  clinic: Joi.string().required(),
  city: Joi.string().required(),
  professional: Joi.string()
    .valid(...Object.values(Professional))
    .required(),
  nameOfMedicOrSpecialist: Joi.string().required(),
  description: Joi.string().required(),
  idMedicalFormula: Joi.string().optional(),
  idHistory: Joi.string().required(),
});

export const medicalHistoryAffiliateSchema = Joi.object({
  idAffiliate: Joi.string().required(),
  medicalHistory: Joi.array().items(medicalHistorySchema),
});

export const updateSchema = Joi.object({
  idAffiliate: Joi.string().required(),
  histories: Joi.array().items(medicalHistorySchema),
});
