const db = require("../models");
const User = db.User;

const userRegistrationService = async (payload) => {
  try {
    const [userdata] = await User.create(payload);
    return userdata;
  } catch (err) {
    const errors = {
      error: "Service Error",
      code: 409,
      name: err.name,
      message: "user already registered",
      actual: err.parent.detail,
    };
    return errors
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
