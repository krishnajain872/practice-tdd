const jwt = require("jsonwebtoken");
const models = require("./../models");
const { errorHelper } = require("../helpers/errorHelp");
const { Op } = require("sequelize");
require("dotenv").config();

const checkAccessToken = async (req, res, next) => {
  const accessToken = req.headers["authorization"]?.split(" ")[1];

  if (!accessToken) {
    return res
      .status(401)
      .send(errorHelper(401, "UNAUTHORIZED ACCESS", "Access Denied"));
  }console.log(accessToken)
  try {
    const decodedJwt = await jwt.verify(accessToken, process.env.JWT_SECRET);

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
    console.log(error);
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .send(
          errorHelper(
            401,
            "UNAUTHORIZED ACCESS",
            "Access Denied due to FORBIDDEN login again"
          )
        );
    } else if (error.message === "Invalid token signature") {
      return res
        .status(401)
        .send(errorHelper(401, "UNAUTHORIZED ACCESS", "Access Denied"));
    } else if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .send(errorHelper(401, "UNAUTHORIZED ACCESS", "Access Denied"));
    } else {
      console.log(error)
      return res.status(500).send(errorHelper(500, "Internal server error"));
    }
  }

  next();
};

module.exports = {
  checkAccessToken,
};
