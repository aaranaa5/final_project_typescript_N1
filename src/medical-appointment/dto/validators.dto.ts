import * as Joi from 'joi';

export const findSchema = Joi.object({
  idAffiliate: Joi.string().required(),
  active: Joi.boolean().required(),
});

export const deleteSchema = Joi.object({
  idAffiliate: Joi.string().required(),
  idAppointment: Joi.array().items(Joi.string().required()),
});

export const medicalAppointmentSchema = Joi.object({
  dateOfAppointment: Joi.date().required(),
  appointmentByRiskGroup: Joi.boolean().required(),
  timeOfAppointment: Joi.string().required(),
  clinic: Joi.string().required(),
  city: Joi.string().required(),
  professional: Joi.string().required(),
  nameOfMedicOrSpecialist: Joi.string().required(),
  requiredAuthorization: Joi.boolean().required(),
  givenAuthorization: Joi.boolean().optional(),
  paid: Joi.boolean().required(),
  active: Joi.boolean().required(),
  idAppointment: Joi.string().required(),
});

export const medicalAppointmentsAffiliateSchema = Joi.object({
  idAffiliate: Joi.string().required(),
  medicalAppointments: Joi.array().items(medicalAppointmentSchema),
});

export const updateSchema = Joi.object({
  idAffiliate: Joi.string().required(),
  appointments: Joi.array().items(medicalAppointmentSchema),
});
