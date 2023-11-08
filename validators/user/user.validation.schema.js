const Joi = require("joi");

const schema = {
  user: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    mobile: Joi.string()
      .pattern(new RegExp("^(\\+\\d{1,3}[- ]?)?\\d{10}$"))
      .required(),
    password: Joi.string().required(),
  }),
};

module.exports = schema;
