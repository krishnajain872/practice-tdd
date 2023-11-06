const { errorHelper } = require("../helpers/errorHelp");
const { responseHelper } = require("../helpers/responseHelp");
const db = require("./../models");
const User = db.User;
const { passHashHelper, passCompareHelper } = require("./../helpers/passHelper");
const jwt = require("jsonwebtoken");
const { payloadValidate } = require("../helpers/payloadValidationHelper");
const { Op } = require("sequelize");

async function userRegistrationService(payload) {
  try {
    //JWT SCRET KEY
    const { JWT_SECRET: secret, JWT_EXPIRATION: expire } = process.env;
    
    if (!payloadValidate(payload)) {
      return errorHelper(400, "validation error", "check payload");
    }

    // create the password hash
    const pass = await passHashHelper(payload.password);
    if (pass == undefined) {
      return errorHelper(500, "service error", "password hash not generated");
    }

    //
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

async function userLoginService(payload) {
  try {
    //JWT SCRET KEY
    const { JWT_SECRET: secret, JWT_EXPIRATION: expire } = process.env;
    //payload validation
    if (!payloadValidate(payload)) {
      return errorHelper(400, "validation error", "check payload");
    }
    const userData = {
      where: {
        [Op.and]: [{ mobile: payload.mobile }, { email: payload.email }],
      },
    };

    const user = await User.findOne(userData);
    if (!user) {
      return errorHelper(404, "User Not Found", "");
    }
    // comapare the password hash
    const pass = await passCompareHelper(payload.password, user.password);
    if (!pass) {
      return errorHelper(401, "UNAUTHORIZED", "Wrong credentials");
    } else {
      if (user.id && pass) {
        const accessToken = jwt.sign(
          {
            mobile: payload.mobile,
            email: payload.email,
          },
          secret,
          {
            expiresIn: expire, // expires in 24 hours
          }
        );
        user.dataValues.accessToken = accessToken;
        return responseHelper(202, true, "User Login Successfully", user);
      }
    }
  } catch (err) {
    return errorHelper(500, "service error", err.message);
  }
}
module.exports = {
  userRegistrationService,
  userLoginService,
};
