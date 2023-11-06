const { error } = require("console");
const { user, login } = require("./user.validation.schema");

const addUserValidation = async (req, res, next) => {
  const value = await user.validate(req.body);
  if (value.error) {
    res.status(400).json({
      code: 400,
      success: false,
      body: {
        message: value.error.details[0].message,
      },
    });
  } else {
    res.status(200);
    next();
  }
};
const loginUserValidation = async (req, res, next) => {
  const value = await login.validate(req.body);
  if (value.error) {
    console.log(error);
    res.status(400).json({
      code: 400,
      success: false,
      body: {
        message: value.error.details[0].message,
      },
    });
  } else {
    res.status(200);
    next();
  }
};

module.exports = {
  addUserValidation,
  loginUserValidation,
};
