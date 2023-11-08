const express = require("express");
const User = require("../models/User");
const { userRegistration, userLogin } = require("../services/user.services");
async function registerUser(req, res) {
  try {
    // payload
    const payload = req.body;
    // service call
    const response = await userRegistration(payload);
    if (response.code === 201 && response.success === true) {
      res.status(201).send(response);
    } else {
      res.status(response.code).send(response);
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

async function loginUser(req, res) {
  try {
    // payload
    const payload = req.body;
    // service call
    const response = await userLogin(payload);

    console.log("responsev => API CONTROLLER RESPONSE", response);
    if (response.code === 202 && response.success === true) {
      res.status(202).send(response);
    } else {
      res.status(response.code).send(response);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
module.exports = {
  registerUser,
  loginUser,
};
