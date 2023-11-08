const express = require("express");
const User = require("../models/User");
const { userRegistration } = require("../services/user.services");
async function registerUser(req, res) {
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
