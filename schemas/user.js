const Joi = require('@hapi/joi');

export default Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    .min(6)
    .max(30)
    .required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  instagram: Joi.string(),
  birthdate: Joi.date(),
});
