const jwt = require("jsonwebtoken");
const models = require("./../models");
require("dotenv").config();

const checkAccessToken = async (req, res, next) => {
  try {
    const header = req.headers["authorization"];
    const accessToken = header ? header.split(" ")[1] : null;
    if (!accessToken) {
      throw new Error("Access denied");
    }
    const decodedJwt = jwt.verify(accessToken, process.env.JWT_SECRET);
    const user = await models.User.findOne({
      where: {
        id: decodedJwt.userId,
      },
    });
    if (!user) {
      throw new Error("User Not found");
    }
    req.user = user;

    next();
  } catch (error) {
    if (error.message == "Access denied") {
      commonErrorHandler(req, res, error.message, 400, error);
    }
    commonErrorHandler(req, res, error.message, 404, error);
  }
};

const verifyUser = async (req, res, next) => {
  try {
    if (req.user.role == "user") {
      next();
    } else {
      throw new Error("user not authorised");
    }
  } catch (error) {
    commonErrorHandler(req, res, error.message, 403, error);
  }
};

module.exports = {
  checkAccessToken,
  verifyUser,
};
