// db models for service
const db = require("./../models");
const User = db.User;

// helpers
const { errorHelper } = require("../helpers/error.helper");
const { responseHelper } = require("../helpers/response.helper");
const { passHashHelper } = require("./../helpers/password.helper");

const jwt = require("jsonwebtoken");

async function userRegistration(payload) {
  try {
    //JWT SCRET KEY
    const { JWT_SECRET: secret, JWT_EXPIRATION: expire } = process.env;

    let isNotEmpty = Object.keys(payload).map(
      (key) => payload[key].length != 0
    );

    if (!isNotEmpty) {
      return errorHelper(400, "validation error", "check payload");
    }
    // create the password hash
    const pass = await passHashHelper(payload.password);
    if (pass == undefined) {
      return errorHelper(500, "service error", "password hash not generated");
    }

    const userData = {
      first_name: payload.first_name,
      last_name: payload.last_name,
      mobile: payload.mobile,
      email: payload.email,
      password: pass,
    };

    // generate an access token
    const accessToken = jwt.sign(
      {
        mobile: payload.mobile,
        email: payload.email,
      },
      secret,
      {
        expiresIn: expire,
      }
    );
    if (accessToken) {
      const user = await User.create(userData);
      user.dataValues.accessToken = accessToken;
      return responseHelper(201, true, "user registered successfully", user);
    } else {
      return errorHelper(500, "jwt error", "access token not generated");
    }
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return errorHelper(409, err.name, err.parent.detail);
    } else {
      return errorHelper(500, "service error", err.message);
    }
  }
}

module.exports = {
  userRegistration,
};
