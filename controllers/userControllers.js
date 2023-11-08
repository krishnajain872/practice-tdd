const express = require("express");
const User = require("../models/User");
const { userRegistration } = require("../services/user.services");
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
module.exports = {
  registerUser,
};

exports.loginUser = async (req, res) => {};
