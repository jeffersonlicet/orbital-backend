const Joi = require('@hapi/joi');

export default Joi.object({
  invitationId: Joi.number().required(),
});
