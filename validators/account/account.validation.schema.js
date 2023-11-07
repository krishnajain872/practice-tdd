const Joi = require("joi");

const schema = {
  account: Joi.object({
    account_type: Joi.string().min(0).required(),
    balance: Joi.number().required(),
    mobile: Joi.string()
      .pattern(new RegExp("^(\\+\\d{1,3}[- ]?)?\\d{10}$"))
      .required(),
  }),
  account_balance: Joi.object({
    account_id: Joi.string().guid({
      version: ["uuidv1"],
    }),
    amount: Joi.number().integer().min(0).required(),
    type: Joi.string().valid("deposite", "withdrawl").required(),
  }),
};

module.exports = schema;
