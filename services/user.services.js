// include database model
const db = require("../models");
const User = db.User;

// include helper variables
const { errorHelper } = require("./../helpers/error.helper");
const { passHashHelper } = require("./../helpers/password.helper");
const { responseHelper } = require("../helpers/response.helper");

async function userRegistrationService(payload) {
  try {
    // creating the password hash
    const pass = await passHashHelper(payload.password);
    if (!pass) {
      return;
      errorHelper(
        "Service Error",
        500,
        "service error",
        "password hash not generated"
      );
    }
    // udpate the payload with encrypted password
    const data = {
      email: payload.email,
      mobile: payload.mobile,
      password: pass,
      first_name: payload.first_name,
      last_name: payload.last_name,
    };
    // create user record in database
    const userdata = await User.create(data);
    return responseHelper(201, true, "user registered successfully", userdata);
  } catch (err) {
    console.log(err);
    return errorHelper(
      500,
      err.name,
      "please check the payload and try again",
      err.parent.detail
    );
  }
}

module.exports = {
  userRegistrationService,
};
