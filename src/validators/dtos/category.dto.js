import Joi from 'joi';

export const categoryDto = Joi.object({
  name: Joi.string().required(),
});
