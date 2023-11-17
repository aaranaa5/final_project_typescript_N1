import * as Joi from 'joi';

export const authenticationSchema = Joi.object({
  user: Joi.string().required(),
  password: Joi.string().required(),
});
