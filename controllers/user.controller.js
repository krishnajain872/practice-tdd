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
    if (response.code === 200 && response.success === true) {
      res.status(200).send(response);
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
