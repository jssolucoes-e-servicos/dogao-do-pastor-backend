import * as Joi from 'joi';

export const envSchema = Joi.object({
  PORT: Joi.string().required(),
  ENVIRONMENT: Joi.string().required(),
  DATABASE_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRE: Joi.string().required(),
});
