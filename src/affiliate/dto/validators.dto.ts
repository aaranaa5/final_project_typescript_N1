import * as Joi from 'joi';

import { Gender, IdentificationTypes, Status } from '../types';

export const findSchema = Joi.object({
  id: Joi.string().required(),
});

export const deleteSchema = Joi.object({
  id: Joi.string().required(),
});

export const affiliateSchema = Joi.object({
  name: Joi.string().required(),
  middleName: Joi.string().optional(),
  lastNames: Joi.string().required(),
  birthdate: Joi.date().required(),
  identificationType: Joi.string()
    .valid(...Object.values(IdentificationTypes))
    .required(),
  id: Joi.string().required(),
  phoneNumber: Joi.string().optional(),
  cellPhoneNumber: Joi.string().required(),
  postalCode: Joi.string().required(),
  address: Joi.string().required(),
  country: Joi.string().required(),
  city: Joi.string().required(),
  email: Joi.string().email().required(),
  gender: Joi.string()
    .valid(...Object.values(Gender))
    .required(),
  status: Joi.string()
    .valid(...Object.values(Status))
    .required(),
  socialStratum: Joi.number().required(),
  sisben: Joi.boolean().required(),
  requiresCompany: Joi.boolean().required(),
});
