const db = require("../models");
const User = db.User;
const userRegistrationService = async (payload) => {
  const userdata = await User.create(payload);

  return userdata;
  console.log(userdata);
};

const userFindService = async (payload) => {
  
};

const userDeleteService = async (payload) => {};

const userUpdateService = async (payload) => {};

module.exports = {
  userRegistrationService,
  userUpdateService,
  userDeleteService,
  userFindService,
};
