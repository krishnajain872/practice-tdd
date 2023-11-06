const express = require("express");
const User = require("../models/User");
const { payloadValidate } = require("../helpers/payloadValidationHelper");

async function registerUser(req, res) {
  try {
    // payload
    const payload = req.body;

    // validate payload
    if (!payloadValidate(payload)) {
      return errorHelper(400, "Bad request", "validation error check payload");
    }
    // service call
    const response = await userRegistrationService(payload);

    console.log("responsev => API CONTROLLER RESPONSE", response);
    if (response.code === 201 && response.success === true) {
      res.status(201).send(response);
    } else {
      res.status(201).send("created");
    }
  } catch (err) {
    res.status(500).send(err);
  }
}
async function loginUser(req, res) {
  try {
    // payload
    const payload = req.body;

    // validate payload
    let isNotEmpty = Object.keys(payload).map(
      (key) => payload[key].length != 0
    );
    if (!isNotEmpty) {
      return errorHelper(400, "Bad request", "validation error check payload");
    }
    // service call
    const response = await userLoginService(payload);

    console.log("responsev => API CONTROLLER RESPONSE", response);
    if (response.code === 202 && response.success === true) {
      res.status(202).send(response);
    } else {
      res.status(response.code).send(response);
    }
  } catch (err) {
    res.status(500).send(err);
  }
}
module.exports = {
  registerUser,
  loginUser,
};
