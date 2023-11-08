import * as Joi from 'joi';

export const findSchema = Joi.object({
  idAffiliate: Joi.string().required(),
  returnAll: Joi.string()
    .valid(...['true', 'false'])
    .optional(),
});

export const deleteSchema = Joi.object({
  idAffiliate: Joi.string().required(),
});

export const medicalFormulasSchema = Joi.array()
  .items(
    Joi.object({
      id: Joi.string().required(),
      html: Joi.string().required(),
      currentFormula: Joi.boolean().required(),
    }).required(),
  )
  .required();

export const medicalFormulaAffiliateSchema = Joi.object({
  idAffiliate: Joi.string().required(),
  formulas: medicalFormulasSchema,
});

export const medicalFormulaUpdateAffiliateSchema = Joi.object({
  idAffiliate: Joi.string().required(),
  formulas: Joi.object({
    id: Joi.string().required(),
    html: Joi.string().required(),
    currentFormula: Joi.boolean().required().valid(true),
  }).required(),
});
