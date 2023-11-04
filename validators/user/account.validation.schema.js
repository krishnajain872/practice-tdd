const Joi = require("joi");

const schema = {
  account: Joi.object({
    account_type: Joi.string().required(),
    balance: Joi.number().required(),
    mobile: Joi.string()
      .pattern(new RegExp("^(\\+\\d{1,3}[- ]?)?\\d{10}$"))
      .required(),
  }),
};

module.exports = schema;
