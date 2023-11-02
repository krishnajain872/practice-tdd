const express = require("express");
const User = require("../models/User");
const { userRegistrationService } = require("../services/user.services");
exports.registerUser = async (req, res) => {
  try {
    const payload = req.body;
    console.log(payload);
    if (!payload) {
      res.status(400).send(
        (response = {
          code: 400,
          success: false,
          data: { message: "bad request", payload: undefined },
        })
      );
    }
    const userdata = userRegistrationService(payload);
    console.log(userdata);

    if (userdata) {
      res.status(201).send(
        (response = {
          code: 201,
          success: true,
          data: { message: "user registered successfully", userdata },
        })
      );
    } else {
      res.status(400).send(
        (response = {
          code: 400,
          success: false,
          data: { message: "bad request", payload: undefined },
        })
      );
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
