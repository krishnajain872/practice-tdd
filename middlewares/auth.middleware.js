const jwt = require("jsonwebtoken");
const models = require("./../models");
const { errorHelper } = require("../helpers/error.helper");
const { Op } = require("sequelize");
require("dotenv").config();

const checkAccessToken = async (req, res, next) => {
  const accessToken = req.headers["authorization"]?.split(" ")[1];

  const { JWT_SECRET: secret } = process.env;

  if (!accessToken) {
    return res
      .status(401)
      .send(errorHelper(401, "UNAUTHORIZED ACCESS", "Access Denied"));
  }
  try {
    const decodedJwt = await jwt.verify(accessToken, secret);

    const user = await models.User.findOne({
      where: {
        [Op.or]: [{ mobile: decodedJwt.mobile }, { email: decodedJwt.email }],
      },
    });

    if (!user) {
      return res
        .status(404)
        .send(errorHelper(404, "Not Found", "No user found"));
    }
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.message === "Invalid token signature" ||
      error.name === "JsonWebTokenError"
    ) {
      return res
        .status(401)
        .send(errorHelper(401, "UNAUTHORIZED ACCESS", "Access Denied"));
    } else {
      return res.status(500).send(errorHelper(500, "Internal server error"));
    }
  }

  next();
};

module.exports = {
  checkAccessToken,
};
