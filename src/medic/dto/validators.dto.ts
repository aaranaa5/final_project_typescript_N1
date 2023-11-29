import * as Joi from 'joi';

import { Gender } from '../types';

export const findSchema = Joi.object({
  medicId: Joi.string().required(),
});

export const deleteSchema = Joi.object({
  medicId: Joi.string().required(),
});

export const medicSchema = Joi.object({
  name: Joi.string().required(),
  middleName: Joi.string().optional(),
  lastNames: Joi.string().required(),
  birthdate: Joi.date().required(),
  medicId: Joi.string().required(),
  email: Joi.string().email().required(),
  gender: Joi.string()
    .valid(...Object.values(Gender))
    .required(),
});
