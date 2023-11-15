import * as Joi from 'joi';

export const findSchema = Joi.object({
  idAffiliate: Joi.string().required(),
});

export const riskGroupSchema = Joi.object({
  name: Joi.string().required(),
  appointmentFrecuencyInMonths: Joi.string().required(),
  lastAppointment: Joi.date().required(),
  specialist: Joi.array().items(Joi.string()).required(),
});

export const deleteSchema = Joi.object({
  idAffiliate: Joi.string().required(),
  riskGroup: riskGroupSchema,
});

export const riskGroupsSchema = Joi.object({
  idAffiliate: Joi.string().required(),
  riskGroups: Joi.array().items(riskGroupSchema),
});
