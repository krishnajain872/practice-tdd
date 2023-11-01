const joi = require("joi");

const schema = {
  user: joi.object({
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    email: joi.string().email().required(),
    mobile: joi
      .number()
      .min(1000000000)
      .message("invalid mobile number")
      .max(9999999999)
      .message("invalid mobile number")
      .required(),
  }),
};

module.exports = schema;
