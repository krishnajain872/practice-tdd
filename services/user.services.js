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

async function userLogin(payload) {
  try {
    //JWT SCRET KEY
    const { JWT_SECRET: secret, JWT_EXPIRATION: expire } = process.env;
    //payload validation
    if (!payloadValidate(payload)) {
      console.log(payload)
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
    console.log("this is the error message \n\n\n\n",err)
    return errorHelper(500, "service error", err.message);
  }
}
module.exports = {
  userRegistration,
  userLogin
};
