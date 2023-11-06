const express = require("express");
const User = require("../models/User");

async function registerUser(req, res) {
  try {
    const payload = req.body;
    console.log(payload)
    if (!payload) {
      res.status(400);
    } else {
      res.status(201).send("created");
    }
  } catch (err) {
    console.log(err);
    res.status(500);
  }
}
module.exports = {
  registerUser,
};
