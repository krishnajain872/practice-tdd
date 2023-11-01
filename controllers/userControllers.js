const express = require("express");
const User = require("../models/User");

const router = new express.Router();

exports.registerUser = async (req, res) => {
  try {
    const payload = req.body;
    console.log(payload);
    if (!payload) {
      res
        .status(400)
        .send(
          (data = { code: 400, body: "no data found payload is undefined" })
        );
    } else {
      res
        .status(201)
        .send({ data: `User created succesfully ${payload}`, code: 201 });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
1