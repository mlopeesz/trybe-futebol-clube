import * as joi from 'joi';

const loginSchema = joi.object({
  email: joi.string().required().email(),
  password: joi.string().required().min(8),
});

export default loginSchema;
