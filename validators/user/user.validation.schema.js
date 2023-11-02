const joi = require("joi");

const schema = {
  user: joi.object({
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    email: joi.string().email().required(),
    mobile: joi.string().required(),
    password: joi.string().required(),
  }),
};

module.exports = schema;
