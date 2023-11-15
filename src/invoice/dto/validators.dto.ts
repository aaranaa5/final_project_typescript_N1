import * as Joi from 'joi';
import { InvoiceStatus } from '../types';

export const findSchema = Joi.object({
  idAffiliate: Joi.string().required(),
  status: Joi.string()
    .valid(...Object.values(InvoiceStatus))
    .optional(),
});

export const updateSchema = Joi.object({
  idAffiliate: Joi.string().required(),
  invoiceId: Joi.string().required(),
});

export const deleteSchema = Joi.object({
  idAffiliate: Joi.string().required(),
});

export const invoiceSchema = Joi.object({
  idAffiliate: Joi.string().required(),
  creationDate: Joi.date().required(),
  html: Joi.string().required(),
  status: Joi.string()
    .valid(...Object.values(InvoiceStatus))
    .required(),
  invoiceId: Joi.string().required(),
});
