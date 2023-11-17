import * as Joi from 'joi';
import { Days } from '../types';

export const findParams = Joi.object({
  locationId: Joi.string().required(),
  day: Joi.string()
    .valid(...Object.values(Days))
    .required(),
});

export const daySchema = Joi.object({
  '08:00': Joi.array().items(Joi.string().required()),
  '09:00': Joi.array().items(Joi.string().required()),
  '10:00': Joi.array().items(Joi.string().required()),
  '11:00': Joi.array().items(Joi.string().required()),
  '12:00': Joi.array().items(Joi.string().required()),
  '13:00': Joi.array().items(Joi.string().required()),
  '14:00': Joi.array().items(Joi.string().required()),
  '15:00': Joi.array().items(Joi.string().required()),
  '16:00': Joi.array().items(Joi.string().required()),
  '17:00': Joi.array().items(Joi.string().required()),
});

export const appointmentScheduleSchema = Joi.object({
  monday: daySchema,
  tuesday: daySchema,
  wednesday: daySchema,
  thursday: daySchema,
  friday: daySchema,
  saturday: daySchema,
  locationId: Joi.string().required(),
});
