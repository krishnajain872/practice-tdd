const Joi = require("joi");

const schema = {
  account: Joi.object({
    account_type: Joi.string().required(),
    balance: Joi.number().required(),
    user_id: Joi.string().guid({ version: "uuidv4" }).required(),
  }),
};

module.exports = schema;
