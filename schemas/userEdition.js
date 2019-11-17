const Joi = require('@hapi/joi');

export default Joi.object({
  avatar: Joi.string().uri(),
  firstname: Joi.string(),
  lastname: Joi.string(),
  instagram: Joi.string(),
  birthday: Joi.date(),
});
