import * as Joi from 'joi';
import { LaboralInhabilityStatus } from '../types';

export const findSchema = Joi.object({
  idAffiliate: Joi.string().required(),
  status: Joi.string()
    .valid(...Object.values(LaboralInhabilityStatus))
    .optional(),
});

export const deleteSchema = Joi.object({
  idAffiliate: Joi.string().required(),
  id: Joi.string().required(),
});

export const laboralInhabilitySchema = Joi.object({
  idAffiliate: Joi.string().required(),
  description: Joi.string().required(),
  expirationDate: Joi.date().required(),
  status: Joi.string()
    .valid(...Object.values(LaboralInhabilityStatus))
    .required(),
  id: Joi.string().required(),
});
