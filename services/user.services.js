const db = require("../models");
const User = db.User;

const errorHelper = require("./../helpers/errorHelp");
const userRegistrationService = async (payload) => {
  try {
    if (
      !payload.email &&
      !payload.mobile &&
      !payload.password &&
      !payload.first_name &&
      !payload.last_name
    ) {
      return errorHelper(
        "Request Not accept unprocceble payload",
        422,
        "service error",
        "please check the payload and try again"
      );
    }
    const pass = passHashHelper(payload.password);
    const data = {
      email: payload.email,
      mobile: payload.mobile,
      password,
      first_name: payload.first_name,
      last_name: payload.last_name,
    };
    const [userdata] = await User.create(data);
    return userdata;
  } catch (err) {
    const errors = errorHelper(
      err,
      409,
      err.name,
      "please check the payload and try again",
      err.parent.detail
    );
    return errors;
  }
};

const userFindService = async (payload) => {};

const userDeleteService = async (payload) => {};

const userUpdateService = async (payload) => {};

module.exports = {
  userRegistrationService,
  userUpdateService,
  userDeleteService,
  userFindService,
};
