const validate = (schema) => async (req, res, next) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(422).json(error);
  } else {
    next();
  }
};

export default validate;
