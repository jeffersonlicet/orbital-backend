const Joi = require('@hapi/joi');

export default Joi.object({
  avatar: Joi.string().required(),
  password: Joi.string()
    .min(6)
    .max(30)
    .required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  instagram: Joi.string().required(),
  birthday: Joi.date(),
  email: Joi.string().email().required(),
});
